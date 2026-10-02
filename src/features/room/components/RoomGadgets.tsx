'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { cx } from '@/shared/utils/cx';
import { afterLines, clockLine, lightLines, musicLines, objectLines, pinnedSkills } from '../constants/lines';
import { useRoom, useSayOnHover } from './RoomProvider';
import styles from './Room.module.css';

// Small interactive things in the room. Their static neighbours live in RoomDecor.

/** Wraps anything (a link, a sticky note) so Nhật says a line when you hover it. */
export function SayOnHover({ line, as: Tag = 'span', className, children }: { line: string; as?: 'span' | 'li'; className?: string; children: ReactNode }) {
  const handlers = useSayOnHover(line);
  return (
    <Tag className={className} {...handlers}>
      {children}
    </Tag>
  );
}

/** Skill sticky notes on the résumé board: a note lifts when hovered and Nhật says where he uses it. */
export function SkillNotes() {
  return (
    <ul className={styles.notes} aria-hidden="true">
      {Object.entries(pinnedSkills).map(([skill, line]) => (
        <SayOnHover key={skill} as="li" line={line} className={styles.note}>
          {skill}
        </SayOnHover>
      ))}
    </ul>
  );
}

/** A switch on the wall: lights off dims the room and turns the window to night. */
export function LightSwitch() {
  const { night, toggleNight, say } = useRoom();
  const flip = () => {
    toggleNight();
    say(night ? lightLines.on : lightLines.off);
  };
  return (
    <button type="button" onClick={flip} className={cx(styles.hotspot, styles.switch)}>
      <span className={styles.lever} aria-hidden="true" />
      <span className={styles.tag}>{night ? 'Turn the lights on' : 'Turn the lights off'}</span>
    </button>
  );
}

const GLYPHS = ['♪', '♫', '♩', '♬'];

/** One note with its own glyph, size, start point, drift and spin, so no two rise alike. */
const randomNote = (id: number) => ({
  id,
  glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  style: {
    left: `${15 + Math.random() * 70}%`,
    fontSize: `${1.3 + Math.random() * 0.9}cqw`,
    animationDuration: `${2 + Math.random() * 1.4}s`,
    '--dx': `${(Math.random() - 0.5) * 5}cqw`,
    '--spin': `${Math.round((Math.random() - 0.5) * 60)}deg`,
  } as CSSProperties,
});

/** A desk speaker: click to play or stop the room's music. While it plays, notes drift up out of it. */
export function Speaker() {
  const { music, toggleMusic, say } = useRoom();
  const [notes, setNotes] = useState<ReturnType<typeof randomNote>[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!music) return;
    let timer: number;
    const spawn = () => {
      setNotes((current) => [...current.slice(-7), randomNote(nextId.current++)]);
      timer = window.setTimeout(spawn, 450 + Math.random() * 800);
    };
    spawn();
    return () => window.clearTimeout(timer);
  }, [music]);

  const flip = () => {
    toggleMusic();
    say(music ? musicLines.off : musicLines.on);
  };

  return (
    <button type="button" onClick={flip} className={cx(styles.hotspot, styles.speaker)}>
      {notes.map((note) => (
        <span
          key={note.id}
          aria-hidden="true"
          className={styles.musicNote}
          style={note.style}
          onAnimationEnd={() => setNotes((current) => current.filter((n) => n.id !== note.id))}
        >
          {note.glyph}
        </span>
      ))}
      <span className={styles.tag}>{music ? 'Stop the music' : 'Play music'}</span>
    </button>
  );
}

const saigonClock = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const saigonTime = () => saigonClock.format(Date.now());
const everyFewSeconds = (tick: () => void) => {
  const id = window.setInterval(tick, 10_000);
  return () => window.clearInterval(id);
};

/** The wall clock shows the real time in Saigon. The hands appear once the browser knows the time. */
export function WallClock({ children }: { children: ReactNode }) {
  const time = useSyncExternalStore(everyFewSeconds, saigonTime, () => null);
  const handlers = useSayOnHover(clockLine(time ?? ''));
  const [hours, minutes] = time ? time.split(':').map(Number) : [0, 0];

  return (
    <button type="button" {...handlers} className={styles.hotspot}>
      {children}
      {time && (
        <>
          <span aria-hidden="true" className={styles.hourHand} style={{ rotate: `${(hours % 12) * 30 + minutes / 2}deg` }} />
          <span aria-hidden="true" className={styles.minuteHand} style={{ rotate: `${minutes * 6}deg` }} />
        </>
      )}
      <span className={styles.tag}>Saigon time</span>
    </button>
  );
}

/** Rubber duck debugging, for real: tell the duck your bug and it answers. */
export function RubberDuck({ children }: { children: ReactNode }) {
  const { say, quack } = useRoom();
  const { onPointerEnter } = useSayOnHover(objectLines.duck);
  const [open, setOpen] = useState(false);
  const [heard, setHeard] = useState(false);

  // After the duck has answered, put the note away.
  useEffect(() => {
    if (!heard) return;
    const close = window.setTimeout(() => setOpen(false), 2200);
    return () => window.clearTimeout(close);
  }, [heard]);

  const toggle = () => {
    quack();
    setHeard(false);
    setOpen((isOpen) => !isOpen);
  };

  const tell = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    quack();
    setHeard(true);
    say(afterLines.duck ?? objectLines.duck);
  };

  return (
    <>
      <button type="button" aria-expanded={open} onPointerEnter={onPointerEnter} onClick={toggle} className={styles.hotspot}>
        {children}
        <span className={styles.tag}>Rubber duck</span>
      </button>
      {open && (
        <form className={styles.duckNote} onSubmit={tell} onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}>
          {heard ? (
            <p className={styles.quack}>Quack.</p>
          ) : (
            <>
              <input name="bug" required autoFocus autoComplete="off" aria-label="Your bug" placeholder="Explain your bug to the duck…" />
              <button type="submit">Tell</button>
            </>
          )}
        </form>
      )}
    </>
  );
}
