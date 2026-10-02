import Image from 'next/image';
import type { CSSProperties } from 'react';
import manifest from '@/shared/art/manifest.json';
import { cx } from '@/shared/utils/cx';

/** Every illustration the site uses. Prompts live in scripts/art/prompts.mjs. */
export type ArtName =
  | 'char-stand'
  | 'char-wave'
  | 'char-window'
  | 'char-guitar'
  | 'char-desk'
  | 'scene-city'
  | 'obj-window'
  | 'obj-window-night'
  | 'obj-clock'
  | 'obj-cat'
  | 'obj-cat-up'
  | 'obj-cat-wag'
  | 'obj-desk'
  | 'obj-duck'
  | 'obj-phone'
  | 'obj-guitar'
  | 'obj-mic'
  | 'obj-shelf'
  | 'obj-trophy'
  | 'obj-pinboard'
  | 'obj-plant-left'
  | 'obj-plant-right'
  | 'obj-rug';

type Box = { left: number; top: number; width: number };

// Written by `npm run art` for every processed file in public/art.
const processed: Partial<Record<ArtName, { src: string; w: number; h: number; over?: Box }>> = manifest;

/** Positions an alternate state (a pose, the night window) exactly over its base image (OVERLAYS in scripts/process-art.mjs). */
export function overlayStyle(name: ArtName): CSSProperties | undefined {
  const over = processed[name]?.over;
  return over && { left: `${over.left}%`, top: `${over.top}%`, width: `${over.width}%` };
}

/** URL of a processed illustration, e.g. for a CSS mask in its shape. */
export const artSrc = (name: ArtName) => processed[name]?.src;

type Props = {
  name: ArtName;
  alt: string;
  /** Expected width ÷ height. Keeps the layout stable while the art does not exist yet. */
  ratio: number;
  className?: string;
  sizes?: string;
  eager?: boolean;
};

/** The processed illustration, or a labelled slot telling you which file to generate. */
export function ArtImage({ name, alt, ratio, className, sizes = '40vw', eager }: Props) {
  const size = processed[name];

  if (!size) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cx('grid w-full place-items-center rounded-[1.5cqw] border-2 border-dashed border-ink/35 bg-paper/55 p-[0.5cqw] text-center', className)}
        style={{ aspectRatio: ratio }}
      >
        <span className="font-hand text-[clamp(9px,1.05cqw,15px)] leading-tight text-ink-soft">{name}.png</span>
      </div>
    );
  }

  return (
    <Image
      src={size.src}
      alt={alt}
      width={size.w}
      height={size.h}
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      className={cx('block h-auto w-full select-none', className)}
      draggable={false}
    />
  );
}
