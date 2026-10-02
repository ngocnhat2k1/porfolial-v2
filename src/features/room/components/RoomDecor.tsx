import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { projects } from '@/features/projects';
import { site } from '@/shared/constants/site';
import { objectLines } from '../constants/lines';
import { LinkHotspot } from './LinkHotspot';
import { SayOnHover } from './RoomGadgets';
import styles from './Room.module.css';

// Small things drawn in code on top of the painted room: text never comes from the AI art.

/** A box positioned in percent of its parent illustration, e.g. the monitor inside the desk. */
export function Area({ left, top, width, height, children }: { left: number; top: number; width: number; height?: number; children: ReactNode }) {
  return (
    <div className={styles.area} style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: height === undefined ? undefined : `${height}%` }}>
      {children}
    </div>
  );
}

const code = [
  [['k', 'const '], ['v', 'nhat'], ['p', ' = {']],
  [['p', '  role: '], ['s', "'FE Lead'"], ['p', ',']],
  [['p', '  stack: ['], ['s', "'Next.js'"], ['p', ', '], ['s', "'TS'"], ['p', '],']],
  [['p', '}; '], ['f', 'ship'], ['p', '(nhat);']],
] as const;

const shots = projects.filter((project) => project.featured);

/** The monitor types out a few lines of code; hovered, it flips through the featured projects. */
export function CodeScreen() {
  return (
    <span className={styles.screen} aria-hidden="true">
      <span className={styles.shots}>
        {shots.map((project, i) => (
          <Image key={project.slug} src={`/work/${project.slug}.jpg`} alt="" fill sizes="13vw" className={styles.shot} style={{ '--i': i, '--n': shots.length } as CSSProperties} />
        ))}
      </span>
      <span className={styles.code}>
        {code.map((line, i) => (
          <span key={i} className={styles.codeLine} style={{ '--i': i, '--chars': line.reduce((n, [, text]) => n + text.length, 0) } as CSSProperties}>
            {line.map(([kind, text], j) => (
              <span key={j} className={styles[`tok-${kind}`]}>
                {text}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

/** A glowing </> sign on the wall that opens GitHub. */
export function NeonSign() {
  return (
    <LinkHotspot href={site.github} label="My code on GitHub" className={styles.neon}>
      <span aria-hidden="true">&lt;/&gt;</span>
    </LinkHotspot>
  );
}

/** The one real photo in the room, in a wooden frame that tilts when hovered. */
export function PhotoFrame() {
  return (
    <LinkHotspot href="/about" label="About me" className={styles.tilt}>
      <SayOnHover line={objectLines.photo} className={styles.frame}>
        <Image src="/images/nhat-beach.jpg" alt="" width={675} height={900} sizes="8vw" className={styles.photo} />
      </SayOnHover>
    </LinkHotspot>
  );
}

const socials = [
  { href: site.github, label: 'GitHub', path: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z' },
  { href: site.linkedin, label: 'LinkedIn', path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59V21h-4V9.75Z' },
  { href: '/contact', label: 'Contact', path: 'M3 5h18v14H3V5Zm2 2v.4l7 4.6 7-4.6V7H5Zm14 2.8-7 4.6-7-4.6V17h14V9.8Z' },
] as const;

/** Wooden tiles on the wall: GitHub, LinkedIn, and the contact page. */
export function SocialTiles() {
  return (
    <ul className={styles.socials}>
      {socials.map((item) => (
        <li key={item.label}>
          <LinkHotspot href={item.href} label={item.label} className={styles.tile}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={item.path} fill="currentColor" />
            </svg>
          </LinkHotspot>
        </li>
      ))}
    </ul>
  );
}
