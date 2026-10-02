'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { cx } from '@/shared/utils/cx';
import { afterLines, objectLines } from '../constants/lines';
import { useRoom, useSayOnHover } from './RoomProvider';
import styles from './Room.module.css';

type Action = 'phone' | 'mic' | 'trophy' | 'guitar' | 'cat';

type Props = {
  action: Action;
  label: string;
  /** Hover effect class from Room.module.css (buzz, shine, waves, shiver, cat). */
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const CONFETTI_COLORS = ['#f4b545', '#ff5ccf', '#2457b3', '#5e9b6c', '#e5484d'];

/** Paper bits flying up and out of the trophy, each on its own path. */
const confettiBurst = () =>
  Array.from(
    { length: 26 },
    (_, i) =>
      ({
        '--dx': `${(Math.random() - 0.5) * 20}cqw`,
        '--dy': `${-1 - Math.random() * 4}cqw`,
        '--spin': `${Math.round(Math.random() * 720 - 360)}deg`,
        background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        animationDelay: `${Math.random() * 0.12}s`,
      }) as CSSProperties,
  );

/** An object that reacts in place: Nhật talks about it on hover, and clicking plays it. */
export function ActionHotspot({ action, label, className, style, children }: Props) {
  const room = useRoom();
  const { onPointerEnter } = useSayOnHover(objectLines[action]);
  const [played, setPlayed] = useState(false);
  const [confetti, setConfetti] = useState<CSSProperties[]>([]);

  useEffect(() => {
    if (confetti.length === 0) return;
    const clear = window.setTimeout(() => setConfetti([]), 1600);
    return () => window.clearTimeout(clear);
  }, [confetti]);

  const run = () => {
    const sounds = { phone: room.buzz, mic: room.hum, trophy: room.chime, guitar: room.strumGuitar, cat: room.meow };
    sounds[action]();
    room.say(afterLines[action] ?? objectLines[action]);
    if (action === 'trophy') setConfetti(confettiBurst());
    setPlayed(true);
  };

  return (
    <button
      type="button"
      onPointerEnter={onPointerEnter}
      onClick={run}
      onAnimationEnd={(event) => event.target === event.currentTarget && setPlayed(false)}
      className={cx(styles.hotspot, className, played && styles.played)}
      style={style}
    >
      {children}
      {confetti.map((bit, i) => (
        <span key={i} aria-hidden="true" className={styles.confetti} style={bit} />
      ))}
      <span className={styles.tag}>{label}</span>
    </button>
  );
}
