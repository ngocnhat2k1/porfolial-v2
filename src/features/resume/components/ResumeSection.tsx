import type { ReactNode } from 'react';

/** A titled résumé section. In print its title never ends a page on its own. */
export function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  const id = `resume-${title.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <section aria-labelledby={id} className="mt-8 print:mt-5">
      <h2 id={id} className="break-after-avoid border-b-2 border-ink pb-1 text-xl print:border-b print:border-black">
        {title}
      </h2>
      <div className="mt-4 space-y-5 print:mt-3 print:space-y-3">{children}</div>
    </section>
  );
}
