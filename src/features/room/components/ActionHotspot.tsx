'use client';

import { useState, type ReactNode } from 'react';
import { cx } from '@/shared/utils/cx';
import { objectLines } from '../constants/lines';
import { useRoom } from './RoomProvider';
import styles from './Room.module.css';

type Action = 'guitar' | keyof typeof objectLines;

/** An object that does something in place: the guitar strums, the others make Nhật talk. */
export function ActionHotspot({ action, label, children }: { action: Action; label: string; children: ReactNode }) {
  const { say, strumGuitar } = useRoom();
  const [played, setPlayed] = useState(false);

  const run = () => {
    if (action === 'guitar') strumGuitar();
    else say(objectLines[action]);
    setPlayed(true);
  };

  return (
    <button
      type="button"
      onClick={run}
      onAnimationEnd={(event) => event.target === event.currentTarget && setPlayed(false)}
      className={cx(styles.hotspot, played && styles.played)}
    >
      {children}
      <span className={styles.tag}>{label}</span>
    </button>
  );
}
