'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { MascotTransition } from '@/shared/components/MascotTransition';
import { cx } from '@/shared/utils/cx';
import { greetings } from '../constants/lines';
import { useRoom } from './RoomProvider';
import styles from './Room.module.css';

type Props = {
  /** Server-rendered poses, swapped on click. */
  standing: ReactNode;
  waving: ReactNode;
  /** Width ÷ height of the standing pose; the box keeps this shape. */
  ratio: number;
};

export function Mascot({ standing, waving, ratio }: Props) {
  const { line, say } = useRoom();
  const [greeting, setGreeting] = useState(0);
  const [isWaving, setWaving] = useState(false);
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
    if (!isWaving) return;
    const stop = window.setTimeout(() => setWaving(false), 2400);
    return () => window.clearTimeout(stop);
  }, [isWaving]);

  const greet = () => {
    const next = (greeting + 1) % greetings.length;
    setGreeting(next);
    setWaving(true);
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
        <button ref={button} type="button" onClick={greet} className={styles.poses} style={{ '--ratio': ratio } as CSSProperties}>
          <span className={cx(styles.pose, isWaving && styles.off)}>{standing}</span>
          <span className={cx(styles.pose, !isWaving && styles.off)}>{waving}</span>
          <span className="sr-only">Say hi to Nhật</span>
        </button>
      </MascotTransition>
    </div>
  );
}
