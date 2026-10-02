import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> & {
  href: string;
  children: ReactNode;
  /** Extra words for screen readers before "(opens in a new tab)", e.g. which project "Visit site" is for. */
  context?: string;
};

/** Opens in a new tab and says so to screen readers. */
export function ExternalLink({ children, context, ...props }: Props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only print:hidden">{context ? `${context} ` : ''}(opens in a new tab)</span>
    </a>
  );
}
