import Image from 'next/image';
import { cx } from '@/shared/utils/cx';
import type { Project } from '../types/project';

type Props = {
  project: Project;
  /** Rendered width of the frame, so `next/image` picks the right file. */
  sizes: string;
  /** Load straight away: the first featured screenshot is usually the page's largest paint. */
  eager?: boolean;
};

const dots = ['bg-dusk', 'bg-sun', 'bg-leaf'];

/** An illustrated browser window: the live site's screenshot, or its status while it is not public. */
export function ProjectPreview({ project, sizes, eager = false }: Props) {
  return (
    <div className={cx('overflow-hidden rounded-card border-[2.5px] border-ink bg-paper', project.featured && 'shadow-pop')}>
      <div className="flex gap-1.5 border-b-[2.5px] border-ink bg-wall px-3 py-2.5" aria-hidden="true">
        {dots.map((color) => (
          <span key={color} className={cx('size-3 rounded-full border-2 border-ink', color)} />
        ))}
      </div>
      <div className="aspect-[16/10]">
        {project.url ? (
          <Image
            src={`/work/${project.slug}.jpg`}
            alt={`Screenshot of the ${project.name} website`}
            width={1440}
            height={900}
            sizes={sizes}
            loading={eager ? 'eager' : undefined}
            fetchPriority={eager ? 'high' : undefined}
            className="size-full object-cover object-top"
          />
        ) : (
          <p className="grid size-full place-items-center px-4 text-center font-bold text-ink-soft">{project.status}</p>
        )}
      </div>
    </div>
  );
}
