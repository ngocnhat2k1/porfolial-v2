'use client';

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { PENTATONIC } from '../domain/music';
import { useRoom } from './RoomProvider';
import styles from './Room.module.css';

type FloatingNote = { id: number; position: number };

/**
 * Invisible play surface over the piano's keys. Where you press picks the note,
 * so it works with any piano drawing. Keyboard users walk up the scale with Enter or Space.
 */
export function PianoKeys() {
  const { playPiano } = useRoom();
  const [notes, setNotes] = useState<FloatingNote[]>([]);
  const nextId = useRef(0);
  const nextKey = useRef(0);

  const play = (position: number) => {
    playPiano(position);
    const id = nextId.current++;
    setNotes((current) => [...current.slice(-5), { id, position }]);
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    play((event.clientX - box.left) / box.width);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    play((nextKey.current++ % PENTATONIC.length) / PENTATONIC.length + 0.01);
  };

  return (
    <button type="button" onPointerDown={onPointerDown} onKeyDown={onKeyDown} className={styles.keys}>
      {notes.map((note) => (
        <span
          key={note.id}
          aria-hidden="true"
          className={styles.floatingNote}
          style={{ left: `${note.position * 100}%` }}
          onAnimationEnd={() => setNotes((current) => current.filter((n) => n.id !== note.id))}
        >
          ♪
        </span>
      ))}
      <span className={styles.tag}>Play the piano</span>
    </button>
  );
}
