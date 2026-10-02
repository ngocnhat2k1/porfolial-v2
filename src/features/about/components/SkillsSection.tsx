import { cx } from '@/shared/utils/cx';
import { skills } from '../constants/career';
import { SkillIcon } from './SkillIcon';

const spans = { 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4' };

/** Skills as a bento of pastel cards: the daily stack as big logo tiles, the rest as icon chips. */
export function SkillsSection() {
  return (
    <section aria-labelledby="skills-title">
      <h2 id="skills-title" className="text-3xl sm:text-4xl">
        Skills
      </h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-6">
        {skills.map(({ group, icon: GroupIcon, tint, span, featured, learning, items }) => (
          <li
            key={group}
            className={cx(
              'group relative isolate overflow-hidden rounded-card border-[2.5px] border-ink p-5 transition duration-300 hover:-translate-y-1 hover:-rotate-[0.4deg]',
              learning ? 'border-dashed' : 'shadow-pop hover:shadow-[6px_6px_0_var(--color-ink)]',
              tint,
              spans[span],
            )}
          >
            <GroupIcon
              aria-hidden="true"
              strokeWidth={1.4}
              className="absolute -right-5 -bottom-6 -z-10 size-32 rotate-12 text-ink/10 transition duration-500 group-hover:rotate-0 group-hover:scale-110 group-hover:text-ink/15"
            />
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xs tracking-[0.18em] uppercase">{group}</h3>
              <span className="text-xs font-bold text-ink-soft">{String(items.length).padStart(2, '0')}</span>
            </div>
            {learning && <p className="mt-1 w-fit -rotate-2 font-hand text-xl text-studio">in progress</p>}

            {featured ? (
              <ul className={cx('mt-5 grid grid-cols-2 gap-3', items.length > 3 ? 'sm:grid-cols-4' : 'sm:grid-cols-3')}>
                {items.map(({ name, icon }) => (
                  <li
                    key={name}
                    className="flex flex-col items-center gap-3 rounded-xl border-2 border-ink bg-paper px-2 pt-5 pb-3 text-center text-sm leading-tight font-bold transition hover:-translate-y-1 hover:rotate-2 hover:shadow-pop-sm"
                  >
                    <SkillIcon icon={icon} className="size-10" />
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map(({ name, icon }) => (
                  <li
                    key={name}
                    className={cx(
                      'flex items-center gap-2 rounded-full border-2 border-ink bg-paper py-1.5 pr-3 pl-2 text-sm leading-none font-bold transition hover:-translate-y-0.5 hover:-rotate-2 hover:shadow-pop-sm',
                      learning && 'border-dashed',
                    )}
                  >
                    <SkillIcon icon={icon} className="size-4.5" />
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
