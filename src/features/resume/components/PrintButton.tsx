'use client';

import { button } from '@/shared/ui/button';

/** Opens the browser's print dialog, which is also where "Save as PDF" lives. */
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={button('primary')}>
      Print or save as PDF
    </button>
  );
}
