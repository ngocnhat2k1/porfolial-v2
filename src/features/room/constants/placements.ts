import type { Placement } from '@/shared/components/Scene';

/**
 * Where everything sits, in percent of the 16:9 room (the wall is drawn in CSS, floor from 76%).
 * Wall objects anchor `top`, floor objects anchor `bottom`.
 */
export const place = {
  window: { left: 40, top: 7, width: 20, z: 1 },
  pinboard: { left: 9, top: 5, width: 21, z: 1 },
  neon: { left: 31.5, top: 13, width: 7, z: 1 },
  shelf: { left: 70, top: 8, width: 22, z: 1 },
  phone: { left: 81.8, bottom: 82.9, width: 2.2, z: 2 },
  trophy: { left: 84.8, bottom: 82.9, width: 4, z: 2 },
  photo: { left: 71, top: 30, width: 6.5, z: 1 },
  socials: { left: 79.5, top: 32, width: 11, z: 1 },
  clock: { left: 62.5, top: 10, width: 5.5, z: 1 },
  lightSwitch: { left: 36, top: 43, width: 1.8, z: 1 },
  desk: { left: 7.5, bottom: 18, width: 27, z: 2 },
  rug: { left: 35, bottom: 2, width: 34, z: 1 },
  mascot: { left: 46.7, bottom: 8, width: 6.6, z: 5 },
  cat: { left: 55.5, bottom: 9.5, width: 6.5, z: 4 },
  mic: { left: 64, bottom: 14, width: 4.2, z: 4 },
  guitar: { left: 74, bottom: 12, width: 7, z: 4 },
  plantLeft: { left: 0.5, bottom: 14, width: 6.5, z: 3 },
  plantRight: { left: 90.5, bottom: 4, width: 9.5, z: 6 },
} satisfies Record<string, Placement>;

/** Interactive areas inside the desk illustration, in percent of that image (measured on it). */
export const deskArea = {
  screen: { left: 26.2, top: 5.2, width: 48, height: 26 },
  keys: { left: 18.5, top: 41.5, width: 61, height: 6.1 },
  duck: { left: 18, top: 43.3, width: 7 },
  speakerLeft: { left: 12.5, top: 22, width: 9.3, height: 15.7 },
  speakerRight: { left: 78, top: 21.7, width: 9.4, height: 16 },
};

/** Width ÷ height of each illustration, for placeholders and the mascot box. */
export const ratio = {
  window: 0.99,
  pinboard: 1.34,
  shelf: 2.41,
  phone: 0.46,
  trophy: 0.67,
  desk: 1.24,
  duck: 1,
  rug: 3.91,
  mascot: 0.277,
  mic: 0.29,
  guitar: 0.38,
  plantLeft: 0.55,
  plantRight: 0.5,
  clock: 1.02,
  cat: 1.9,
} as const;
