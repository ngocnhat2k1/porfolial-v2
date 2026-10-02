import type { LucideIcon } from 'lucide-react';
import { ExternalLink } from '@/shared/components/ExternalLink';
import { cx } from '@/shared/utils/cx';
import type { Project } from '../types/project';
import { ProjectPreview } from './ProjectPreview';

type Props = {
  project: Project;
  icon: LucideIcon;
  /** Pastel `bg-*` token. */
  tint: string;
  sizes: string;
  /** Bigger card that also shows the role and stack. */
  featured?: boolean;
  eager?: boolean;
};

/** "12/2023 – 04/2024" → "2023 – 2024", "02/2024 – Present" → "2024 – now". */
const years = (period: string) => [...new Set(period.match(/\d{4}|Present/g))].join(' – ').replace('Present', 'now');

/**
 * A pastel card: kind and years, the screenshot, name and one line. The whole card links to the live site
 * (the name's link is stretched over it); hovered, it lifts and a "visit" sticker pops onto the corner.
 */
export function ProjectCard({ project, icon, tint, sizes, featured, eager }: Props) {
  const { name, url, kind, what, role, period, stack, note } = project;
  const Title = featured ? 'h2' : 'h3';

  return (
    <article
      className={cx(
        'group relative flex flex-col rounded-card border-[2.5px] border-ink shadow-pop transition duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[7px_7px_0_var(--color-ink)] has-[a:focus-visible]:-translate-y-1.5',
        featured ? 'p-4 sm:p-5' : 'p-3.5',
        tint,
      )}
    >
      <p className="flex justify-between gap-3 text-[0.7rem] leading-none font-bold tracking-[0.16em] text-ink-soft uppercase">
        <span className="min-w-0 truncate">{kind}</span>
        <span className="shrink-0">{years(period)}</span>
      </p>
      <ProjectPreview project={project} icon={icon} sizes={sizes} eager={eager} />

      <Title className={cx('mt-4', featured ? 'text-2xl sm:text-3xl' : 'text-lg')}>
        {url ? (
          <ExternalLink href={url} context={`: ${name}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
            {name}
          </ExternalLink>
        ) : (
          name
        )}
      </Title>
      {note && <p className="w-fit -rotate-2 font-hand text-lg text-studio">{note}</p>}
      <p className={cx('mt-1 text-ink-soft', featured ? 'text-base' : 'line-clamp-3 text-sm leading-snug')}>{what}</p>

      {featured && (
        <>
          <p className="mt-3 text-sm font-bold">{role}</p>
          <ul aria-label="Tech stack" className="mt-3 flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <li key={tech} className="rounded-full border-2 border-ink bg-paper px-2.5 py-1 text-xs leading-none font-bold">
                {tech}
              </li>
            ))}
          </ul>
        </>
      )}

      {url && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 -right-3 rotate-12 scale-0 rounded-full border-2 border-ink bg-sun px-3 py-1 font-hand text-lg leading-none shadow-pop-sm transition duration-300 group-hover:scale-100 group-has-[a:focus-visible]:scale-100"
        >
          visit ↗
        </span>
      )}
    </article>
  );
}
