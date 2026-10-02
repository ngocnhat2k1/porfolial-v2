'use client';

import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx } from '@/shared/utils/cx';
import { useSynth } from '../hooks/useSynth';
import styles from './Room.module.css';

type Room = ReturnType<typeof useSynth> & {
  /** What Nhật is currently saying, if anything. */
  line: string | null;
  say: (line: string) => void;
  /** Lights off: the room dims and the window shows the city at night. */
  night: boolean;
  toggleNight: () => void;
  /** Background music from the desk speakers. */
  music: boolean;
  toggleMusic: () => void;
};

const RoomContext = createContext<Room | null>(null);

/** Client state for the room: the speech bubble, the lights, the music and the sounds. The scene itself stays server-rendered. */
export function RoomProvider({ children }: { children: ReactNode }) {
  const [line, setLine] = useState<string | null>(null);
  const [night, setNight] = useState(false);
  const [music, setMusic] = useState(false);
  const track = useRef<HTMLAudioElement | null>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const synth = useSynth();

  const say = useCallback((next: string) => {
    setLine(next);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setLine(null), 4500);
  }, []);
  const toggleNight = useCallback(() => setNight((on) => !on), []);
  const toggleMusic = useCallback(() => {
    const audio = track.current;
    if (audio?.paused) audio.play().catch(() => {});
    else audio?.pause();
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  // Music is on by default. Browsers refuse sound until the visitor has interacted (arriving through a link counts),
  // so if autoplay is refused it starts on their first click instead. `music` follows what the track is really doing.
  useEffect(() => {
    const audio = Object.assign(new Audio('/audio/room-music.mp3'), { loop: true, volume: 0.4 });
    audio.onplay = () => setMusic(true);
    audio.onpause = () => setMusic(false);
    track.current = audio;
    const leave = new AbortController();
    const play = () => void audio.play().catch(() => {});
    // Bubble phase: a click on a speaker is handled by React first, so it is not started twice and stopped.
    audio.play().catch(() => window.addEventListener('click', play, { once: true, signal: leave.signal }));
    return () => {
      leave.abort();
      audio.pause();
    };
  }, []);

  const { playPiano, strumGuitar, quack, meow, buzz, hum, chime } = synth;
  const room = useMemo(
    () => ({ line, say, night, toggleNight, music, toggleMusic, playPiano, strumGuitar, quack, meow, buzz, hum, chime }),
    [line, say, night, toggleNight, music, toggleMusic, playPiano, strumGuitar, quack, meow, buzz, hum, chime],
  );
  return (
    <RoomContext value={room}>
      <div className={cx(styles.room, night && styles.night)}>{children}</div>
    </RoomContext>
  );
}

export function useRoom() {
  const room = use(RoomContext);
  if (!room) throw new Error('useRoom() must be used inside <RoomProvider>.');
  return room;
}

/** Hover with a mouse says the line; touch has no hover (and fires pointerenter on every tap), so it says it on tap. */
export function useSayOnHover(line: string) {
  const { say } = useRoom();
  return {
    onPointerEnter: (event: { pointerType: string }) => event.pointerType === 'mouse' && say(line),
    onClick: () => say(line),
  };
}
