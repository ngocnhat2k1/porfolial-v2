// Generate candidate illustrations with bytedance/seedream-4.5 on Replicate.
//
//   npm run art:gen -- obj-desk obj-piano --n=2
//
// Candidates land in art-raw/candidates/; copy the chosen one to art-raw/<name>.jpg,
// then `npm run art`. Every generation is counted in art-raw/ledger.json against a hard cap.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import Replicate from 'replicate';
import { ASSETS } from './prompts.mjs';

const MODEL = 'bytedance/seedream-4.5';
const CAP = 80;
// Under $5 of credit Replicate allows 6 new predictions a minute with a burst of 1.
const START_GAP_MS = 10_500;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const throttled = (error) => String(error?.message ?? error).includes('429');
const LEDGER = 'art-raw/ledger.json';
const OUT = 'art-raw/candidates';

const args = process.argv.slice(2);
const perAsset = Number(args.find((a) => a.startsWith('--n='))?.slice(4) ?? 1);
const names = args.filter((a) => !a.startsWith('--'));
const unknown = names.filter((name) => !ASSETS[name]);

if (names.length === 0 || unknown.length > 0) {
  console.error(`Usage: npm run art:gen -- <name...> [--n=2]\nUnknown: ${unknown.join(', ') || '-'}\nKnown: ${Object.keys(ASSETS).join(', ')}`);
  process.exit(1);
}
if (!process.env.REPLICATE_API_TOKEN) {
  console.error('REPLICATE_API_TOKEN is missing. Put it in .env.local.');
  process.exit(1);
}

const ledger = JSON.parse(await readFile(LEDGER, 'utf8').catch(() => '{"count":0,"runs":[]}'));
const jobs = names.flatMap((name) => Array.from({ length: perAsset }, () => name));
if (ledger.count + jobs.length > CAP) {
  console.error(`Hard cap: ${ledger.count}/${CAP} generations used, ${jobs.length} more requested. Raise CAP deliberately if needed.`);
  process.exit(1);
}

const first = ledger.runs.length + 1;
await mkdir(OUT, { recursive: true });

const replicate = new Replicate();

async function generate(name, seq) {
  const { prompt, aspect, size = '2K', refs = [] } = ASSETS[name];
  const input = { prompt, size, aspect_ratio: aspect, sequential_image_generation: 'disabled' };
  if (refs.length > 0) input.image_input = await Promise.all(refs.map((file) => readFile(file)));

  const [output] = await replicate.run(MODEL, { input });
  const ext = path.extname(new URL(output.url()).pathname) || '.jpg';
  const file = path.join(OUT, `${name}-${seq}${ext}`);
  await writeFile(file, Buffer.from(await (await output.blob()).arrayBuffer()));
  return file;
}

/** Start one prediction every START_GAP_MS; a throttled request is not billed, so wait and retry it. */
async function run(name, i) {
  await sleep(i * START_GAP_MS);
  for (let attempt = 1; ; attempt++) {
    try {
      return await generate(name, first + i);
    } catch (error) {
      if (!throttled(error) || attempt === 4) throw error;
      await sleep(15_000 * attempt);
    }
  }
}

const results = await Promise.allSettled(jobs.map(run));

for (const [i, result] of results.entries()) {
  const entry = { seq: first + i, name: jobs[i], ok: result.status === 'fulfilled' };
  // A throttled request never ran; anything else may have been billed, so it counts.
  if (result.status === 'fulfilled' || !throttled(result.reason)) ledger.count += 1;
  if (result.status === 'fulfilled') {
    entry.file = result.value;
    console.log(`✓ ${result.value}`);
  } else {
    entry.error = String(result.reason?.message ?? result.reason).slice(0, 300);
    console.log(`✗ ${jobs[i]}: ${entry.error}`);
  }
  ledger.runs.push(entry);
}
await writeFile(LEDGER, `${JSON.stringify(ledger, null, 2)}\n`);
console.log(`Used ${ledger.count}/${CAP} generations.`);
