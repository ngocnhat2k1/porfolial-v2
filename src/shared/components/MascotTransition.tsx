import { ViewTransition, type ReactNode } from 'react';

/**
 * Nhật has the same view-transition name on the balcony and in the room,
 * so entering the room moves one character instead of swapping two.
 */
export function MascotTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition name="nhat" share="walk" default="none">
      {children}
    </ViewTransition>
  );
}
