import { cx } from '@/shared/utils/cx';
import { skills } from '../constants/career';

/** Skills by group. The group still being learned is drawn dashed, like a sketch not yet inked. */
export function SkillsSection() {
  return (
    <section aria-labelledby="skills-title">
      <h2 id="skills-title" className="text-3xl sm:text-4xl">
        Skills
      </h2>
      <dl className="mt-6">
        {skills.map(({ group, items, learning }) => (
          <div
            key={group}
            className={cx(
              'grid gap-x-10 gap-y-3 py-4 md:grid-cols-[14rem_minmax(0,1fr)]',
              // Bleeds out by its padding + border so the columns stay aligned with the other rows.
              learning && '-mx-3.5 rounded-card border-2 border-dashed border-ink px-3',
            )}
          >
            <dt className="font-bold">
              {group}
              {learning && <span className="mt-1 block w-fit -rotate-2 font-hand text-xl font-normal text-studio">in progress</span>}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li key={item} className="rounded-full border-2 border-ink bg-paper px-3 py-1.5 text-sm leading-none font-bold">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
