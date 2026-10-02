import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { G_MAJOR, noteAt, noteFrequency, playBuzz, playHum, playMeow, playPianoNote, playQuack, playStrum } from '../domain/music';

/** What Nhật hums at the microphone, and the trophy's chime (C major pentatonic, MIDI). */
const TUNE = [67, 69, 72, 69, 67, 64, 67] as const;
const CHIME = [79, 84, 88] as const;

// Browsers only allow audio after a user gesture, so the context is created on the first click.
const audioOf = (ref: RefObject<AudioContext | null>) => (ref.current ??= new AudioContext());

export function useSynth() {
  const context = useRef<AudioContext | null>(null);

  useEffect(() => () => void context.current?.close(), []);

  /** `position` is where the keyboard was pressed, 0 (left) to 1 (right). */
  const playPiano = useCallback((position: number) => playPianoNote(audioOf(context), noteFrequency(noteAt(position))), []);
  const strumGuitar = useCallback(() => playStrum(audioOf(context), G_MAJOR.map(noteFrequency)), []);
  const quack = useCallback(() => playQuack(audioOf(context)), []);
  const meow = useCallback(() => playMeow(audioOf(context)), []);
  const buzz = useCallback(() => playBuzz(audioOf(context)), []);
  const hum = useCallback(() => playHum(audioOf(context), TUNE.map(noteFrequency)), []);
  const chime = useCallback(() => CHIME.forEach((note, i) => playPianoNote(audioOf(context), noteFrequency(note), i * 0.09)), []);

  return { playPiano, strumGuitar, quack, meow, buzz, hum, chime };
}
