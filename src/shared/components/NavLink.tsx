'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { cx } from '@/shared/utils/cx';

type Props = {
  href: string;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
};

// Home and the room are "back" moves; every other page is a step deeper (see globals.css).
const transitionFor = (href: string) => (href === '/' || href === '/room' ? ['back'] : ['door']);

export function NavLink({ href, className, activeClassName, children }: Props) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      transitionTypes={transitionFor(href)}
      aria-current={active ? 'page' : undefined}
      className={cx(className, active && activeClassName)}
      onClick={() => document.getElementById('site-menu')?.hidePopover()}
    >
      {children}
    </Link>
  );
}
