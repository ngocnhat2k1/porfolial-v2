'use client';

import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useSynth } from '../hooks/useSynth';

type Room = {
  /** What Nhật is currently saying, if anything. */
  line: string | null;
  say: (line: string) => void;
  playPiano: (position: number) => void;
  strumGuitar: () => void;
};

const RoomContext = createContext<Room | null>(null);

/** Client state for the room: the speech bubble and the instruments. The scene itself stays server-rendered. */
export function RoomProvider({ children }: { children: ReactNode }) {
  const [line, setLine] = useState<string | null>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const { playPiano, strumGuitar } = useSynth();

  const say = useCallback((next: string) => {
    setLine(next);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setLine(null), 4500);
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  const room = useMemo(() => ({ line, say, playPiano, strumGuitar }), [line, say, playPiano, strumGuitar]);
  return <RoomContext value={room}>{children}</RoomContext>;
}

export function useRoom() {
  const room = use(RoomContext);
  if (!room) throw new Error('useRoom() must be used inside <RoomProvider>.');
  return room;
}
