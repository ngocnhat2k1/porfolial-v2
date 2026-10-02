import type { Project } from '../types/project';
import { ProjectDetails } from './ProjectDetails';
import { ProjectPreview } from './ProjectPreview';

/** A headline project: a large screenshot beside the details. */
export function FeaturedProject({ project, eager }: { project: Project; eager?: boolean }) {
  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14">
      <ProjectPreview project={project} sizes="(min-width: 1024px) 580px, calc(100vw - 32px)" eager={eager} />
      <div>
        <h2 className="text-3xl sm:text-4xl">{project.name}</h2>
        <ProjectDetails project={project} />
      </div>
    </article>
  );
}
