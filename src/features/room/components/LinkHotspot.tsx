import Link from 'next/link';
import type { ReactNode } from 'react';
import { ExternalLink } from '@/shared/components/ExternalLink';
import { cx } from '@/shared/utils/cx';
import styles from './Room.module.css';

type Props = {
  href: string;
  label: string;
  className?: string;
  children?: ReactNode;
};

/** An object that takes you somewhere. Pages open like a door; the balcony is a step back. */
export function LinkHotspot({ href, label, className, children }: Props) {
  const tag = <span className={styles.tag}>{label}</span>;

  if (/^https?:/.test(href)) {
    return (
      <ExternalLink href={href} className={cx(styles.hotspot, className)}>
        {children}
        {tag}
      </ExternalLink>
    );
  }

  return (
    <Link href={href} transitionTypes={href === '/' ? ['back'] : ['door']} className={cx(styles.hotspot, className)}>
      {children}
      {tag}
    </Link>
  );
}
