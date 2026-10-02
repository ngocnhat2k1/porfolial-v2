import { ViewTransition, type ReactNode } from 'react';

const byType = { door: 'door', back: 'back', default: 'none' };

/** Wrap each page (not the layout: layouts persist, so they never enter or exit). */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={byType} exit={byType} default="none">
      {children}
    </ViewTransition>
  );
}
