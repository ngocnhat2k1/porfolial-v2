import { menu, nav } from '@/shared/constants/site';
import { NavLink } from './NavLink';

const roundButton =
  'grid size-12 place-items-center rounded-full border-[2.5px] border-ink bg-paper text-ink shadow-pop-sm transition-transform hover:-translate-y-0.5';

/** Top bar (home + menu) and the bottom dock. Pinned during page transitions. */
export function SiteChrome() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 print:hidden" style={{ viewTransitionName: 'site-chrome' }}>
      <header className="absolute inset-x-4 top-4 flex items-center justify-between">
        <NavLink href="/" className={`pointer-events-auto ${roundButton}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11l9-7 9 7" />
            <path d="M5 10v10h14V10" />
          </svg>
          <span className="sr-only">Back to the balcony</span>
        </NavLink>

        <button type="button" popoverTarget="site-menu" className={`pointer-events-auto cursor-pointer ${roundButton}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <span className="sr-only">Open menu</span>
        </button>
      </header>

      <nav
        id="site-menu"
        popover="auto"
        aria-label="All pages"
        className="pointer-events-auto m-0 min-w-56 rounded-card border-[2.5px] border-ink bg-paper p-3 shadow-pop [inset:76px_16px_auto_auto]"
      >
        <ul>
          {menu.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} className="block rounded-lg px-3 py-2.5 font-bold text-ink hover:bg-wall" activeClassName="bg-wall">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav
        aria-label="Quick links"
        className="pointer-events-auto absolute bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border-[2.5px] border-ink bg-paper p-1.5 shadow-pop"
      >
        {nav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-2 text-sm font-bold leading-none text-ink hover:bg-wall sm:px-4"
            activeClassName="!bg-ink !text-paper"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
