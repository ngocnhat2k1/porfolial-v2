import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '../types/project';

type Props = {
  project: Project;
  /** Fills the frame when there is no screenshot. */
  icon: LucideIcon;
  /** Rendered width of the frame, so `next/image` picks the right file. */
  sizes: string;
  /** Load straight away: the first featured screenshot is usually the page's largest paint. */
  eager?: boolean;
};

/** The live site's screenshot in an ink frame, or, while there is no public site, its icon and status. */
export function ProjectPreview({ project, icon: Icon, sizes, eager = false }: Props) {
  return (
    <div className="mt-3 aspect-[16/10] overflow-hidden rounded-[10px] border-2 border-ink bg-paper">
      {project.url ? (
        <Image
          src={`/work/${project.slug}.jpg`}
          alt={`Screenshot of the ${project.name} website`}
          width={1440}
          height={900}
          sizes={sizes}
          loading={eager ? 'eager' : undefined}
          fetchPriority={eager ? 'high' : undefined}
          className="size-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="grid size-full place-content-center justify-items-center gap-2 bg-[repeating-linear-gradient(-45deg,transparent_0_10px,rgb(38_35_56/0.04)_10px_20px)] px-4 text-center">
          <Icon aria-hidden="true" strokeWidth={1.6} className="size-10 text-ink/60 transition duration-500 group-hover:-rotate-6 group-hover:scale-110" />
          <p className="text-sm font-bold text-ink-soft">{project.status}</p>
        </div>
      )}
    </div>
  );
}
