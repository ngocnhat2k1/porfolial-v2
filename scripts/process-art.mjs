// Turns the raw AI images in art-raw/ into web-ready WebP files in public/art/
// and records their sizes in src/shared/art/manifest.json (read by <ArtImage>).
//
//   npm run art
//
// - Green-screen backgrounds are keyed out to transparency (flood fill from the border); real PNG transparency passes through.
// - Characters and objects are trimmed to their visible pixels; full-bleed scenes keep their frame.
import { createHash } from 'node:crypto';
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const RAW_DIR = 'art-raw';
const OUT_DIR = 'public/art';
const MANIFEST = 'src/shared/art/manifest.json';

const FULL_BLEED = new Set(['scene-city', 'scene-room']); // no keying, no trimming

// Generated green screens are not flat: light rays tint parts of them yellow and soft shadows
// darken them. A pixel counts as screen when it is a bright yellow-green (blue well below green,
// red not far above it) or when green clearly dominates (shadowed screen).
const isScreen = (r, g, b) => (g > 150 && b < g - 55 && r < g + 35) || (g > 80 && g > r + 30 && g > b + 30);
// These drawings contain green of their own, so enclosed green is kept instead of punched out.
const GREEN_INSIDE = new Set(['obj-phone', 'obj-plant-left', 'obj-plant-right', 'obj-shelf']);
// Drawings with small floating parts (music notes) that must not be cleaned up as specks.
const FLOATING_PARTS = new Set(['char-guitar']);

/**
 * Remove the green screen: flood-fill from the image border (the line art fences the drawing off),
 * then punch out enclosed pockets of the same green, e.g. between the legs of a stand.
 */
async function keyBackground(input, name) {
  const { data, info } = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const size = w * h;
  const border = [];
  for (let x = 0; x < w; x++) border.push(x, (h - 1) * w + x);
  for (let y = 1; y < h - 1; y++) border.push(y * w, y * w + w - 1);

  const screen = (p) => isScreen(data[p * 4], data[p * 4 + 1], data[p * 4 + 2]);
  if (border.filter((p) => data[p * 4 + 3] < 255).length > border.length / 2) return sharp(data, { raw: info }); // already transparent
  if (border.filter(screen).length < border.length / 2) return sharp(data, { raw: info }); // not a green screen

  const removed = new Uint8Array(size);
  const stack = border.filter(screen);
  for (const p of stack) removed[p] = 1;
  while (stack.length > 0) {
    const p = stack.pop();
    const x = p % w;
    for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p - w, p + w]) {
      if (q < 0 || q >= size || removed[q] || !screen(q)) continue;
      removed[q] = 1;
      stack.push(q);
    }
  }

  if (!GREEN_INSIDE.has(name)) {
    const median = (c) => border.map((p) => data[p * 4 + c]).sort((m, n) => m - n)[border.length >> 1];
    const [r0, g0, b0] = [median(0), median(1), median(2)];
    for (let p = 0; p < size; p++) {
      const i = p * 4;
      if (!removed[p] && Math.hypot(data[i] - r0, data[i + 1] - g0, data[i + 2] - b0) < 45) removed[p] = 1;
    }
  }

  dropStrayRegions(removed, w, h, FLOATING_PARTS.has(name));

  for (let p = 0; p < size; p++) {
    const i = p * 4;
    if (removed[p]) {
      data[i + 3] = 0;
      continue;
    }
    const x = p % w;
    const edge = (x > 0 && removed[p - 1]) || (x < w - 1 && removed[p + 1]) || removed[p - w] || removed[p + w];
    if (edge) data[i + 1] = Math.min(data[i + 1], Math.max(data[i], data[i + 2]) + 8); // remove the green fringe
  }
  return sharp(data, { raw: info });
}

/**
 * Light rays and stray backdrop (a wall the model added) start at the image edge. The subject is
 * the largest region, unless a sizeable region that stays clear of the edge exists (then that one:
 * the backdrop was bigger than the object). Everything else touching the edge goes, and so do
 * floating bits under 10% of the subject.
 */
function dropStrayRegions(removed, w, h, keepSpecks) {
  const label = new Int32Array(w * h).fill(-1);
  const regions = [];
  for (let start = 0; start < w * h; start++) {
    if (removed[start] || label[start] !== -1) continue;
    const id = regions.length;
    const pixels = [start];
    let touchesEdge = false;
    label[start] = id;
    for (let k = 0; k < pixels.length; k++) {
      const p = pixels[k];
      const x = p % w;
      const y = (p - x) / w;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) touchesEdge = true;
      for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, y > 0 ? p - w : -1, y < h - 1 ? p + w : -1]) {
        if (q < 0 || removed[q] || label[q] !== -1) continue;
        label[q] = id;
        pixels.push(q);
      }
    }
    regions.push({ pixels, touchesEdge });
  }
  const biggest = (list) => list.reduce((a, b) => (b.pixels.length > a.pixels.length ? b : a));
  const overall = biggest(regions);
  const inside = regions.filter((region) => !region.touchesEdge);
  const clear = inside.length > 0 ? biggest(inside) : null;
  const largest = clear && clear.pixels.length >= overall.pixels.length * 0.25 ? clear : overall;
  for (const region of regions) {
    const speck = !keepSpecks && region.pixels.length < largest.pixels.length * 0.1;
    if (region !== largest && (region.touchesEdge || speck)) for (const p of region.pixels) removed[p] = 1;
  }
}

async function processFile(file) {
  const name = path.parse(file).name;
  let image = sharp(path.join(RAW_DIR, file));

  if (!FULL_BLEED.has(name)) {
    image = await keyBackground(image, name);
    image = sharp(await image.png().toBuffer()).trim();
  }

  const longest = name.startsWith('scene-') ? 2400 : 1400;
  const { data, info } = await image
    .resize({ width: longest, height: longest, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 5 })
    .toBuffer({ resolveWithObject: true });

  // Content hash in the file name: a regenerated image gets a new URL, so no cache serves the old one.
  const output = `${name}.${createHash('sha1').update(data).digest('hex').slice(0, 8)}.webp`;
  await writeFile(path.join(OUT_DIR, output), data);
  return [name, { src: `/art/${output}`, w: info.width, h: info.height }];
}

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });
const files = (await readdir(RAW_DIR).catch(() => [])).filter((f) => /\.(png|jpe?g|webp)$/i.test(f) && !f.startsWith('char-sheet'));

if (files.length === 0) {
  console.log(`No images in ${RAW_DIR}/ yet. See docs/ART_PROMPTS.md.`);
  process.exit(0);
}

const manifest = Object.fromEntries(await Promise.all(files.map(processFile)));
await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
for (const { src, w, h } of Object.values(manifest)) console.log(`✓ ${src}  ${w}×${h}`);
