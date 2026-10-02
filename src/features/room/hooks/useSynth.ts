import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { G_MAJOR, noteAt, noteFrequency, playPianoNote, playQuack, playStrum } from '../domain/music';

// Browsers only allow audio after a user gesture, so the context is created on the first click.
const audioOf = (ref: RefObject<AudioContext | null>) => (ref.current ??= new AudioContext());

export function useSynth() {
  const context = useRef<AudioContext | null>(null);

  useEffect(() => () => void context.current?.close(), []);

  /** `position` is where the keyboard was pressed, 0 (left) to 1 (right). */
  const playPiano = useCallback((position: number) => playPianoNote(audioOf(context), noteFrequency(noteAt(position))), []);
  const strumGuitar = useCallback(() => playStrum(audioOf(context), G_MAJOR.map(noteFrequency)), []);
  const quack = useCallback(() => playQuack(audioOf(context)), []);

  return { playPiano, strumGuitar, quack };
}
