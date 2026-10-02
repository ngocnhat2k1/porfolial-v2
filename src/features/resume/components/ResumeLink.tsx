import type { ReactNode } from 'react';
import { ExternalLink } from '@/shared/components/ExternalLink';

type Props = {
  href: string;
  /** Defaults to the bare web address, so a printed copy still says where the link goes. */
  children?: ReactNode;
};

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const style = 'underline decoration-1 underline-offset-2 wrap-anywhere hover:text-studio print:no-underline';

/** Underlined on screen, plain text on paper. Web addresses open in a new tab. */
export function ResumeLink({ href, children = bare(href) }: Props) {
  if (/^https?:/.test(href)) {
    return (
      <ExternalLink href={href} className={style}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <a href={href} className={style}>
      {children}
    </a>
  );
}
