import type { ReactNode } from 'react';

type Props = {
  title: string;
  period: string;
  points?: string[];
  children?: ReactNode;
};

/** A job, project or school: title and dates on one line, details and bullets below, never split across printed pages. */
export function ResumeEntry({ title, period, points, children }: Props) {
  return (
    <article className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-lg">{title}</h3>
        <p className="text-ink-soft print:text-black">{period}</p>
      </div>
      {children}
      {points && (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
