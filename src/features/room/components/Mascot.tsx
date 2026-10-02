'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MascotTransition } from '@/shared/components/MascotTransition';
import { cx } from '@/shared/utils/cx';
import { greetings } from '../constants/lines';
import { useRoom } from './RoomProvider';
import styles from './Room.module.css';

type Props = {
  /** Server-rendered poses: he waves while a mouse is over him, or for a moment after a tap. */
  standing: ReactNode;
  waving: ReactNode;
  /** Where the waving pose sits over the standing one, in percent of it (from the art manifest). */
  over?: { left: number; top: number; width: number };
};

export function Mascot({ standing, waving, over }: Props) {
  const { line, say } = useRoom();
  const [greeting, setGreeting] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  // On arrival: start a phone's sideways pan on Nhật, then let him say hello.
  useEffect(() => {
    if (window.matchMedia('(orientation: portrait)').matches) {
      button.current?.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    const hello = window.setTimeout(() => say(greetings[0]), 900);
    return () => window.clearTimeout(hello);
  }, [say]);

  useEffect(() => {
    if (!tapped) return;
    const stop = window.setTimeout(() => setTapped(false), 2400);
    return () => window.clearTimeout(stop);
  }, [tapped]);

  const greet = () => {
    const next = (greeting + 1) % greetings.length;
    setGreeting(next);
    say(greetings[next]);
  };

  return (
    <div className={styles.mascot}>
      <p role="status" className={styles.bubble}>
        {line && (
          <span key={line} className={styles.line}>
            {line}
          </span>
        )}
      </p>
      <MascotTransition>
        <button
          ref={button}
          type="button"
          // Touch has no hover (and fires pointerenter on every tap), so only a mouse waves on hover.
          onPointerEnter={(event) => {
            if (event.pointerType !== 'mouse') return;
            setHovered(true);
            greet();
          }}
          onPointerLeave={() => setHovered(false)}
          onClick={() => {
            greet();
            setTapped(true);
          }}
          className={cx(styles.poses, (hovered || tapped) && styles.waving)}
        >
          {standing}
          <span className={styles.wave} style={over && { left: `${over.left}%`, top: `${over.top}%`, width: `${over.width}%` }}>
            {waving}
          </span>
          <span className="sr-only">Say hi to Nhật</span>
        </button>
      </MascotTransition>
    </div>
  );
}
