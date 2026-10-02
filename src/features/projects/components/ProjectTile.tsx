import type { Project } from '../types/project';
import { ProjectDetails } from './ProjectDetails';
import { ProjectPreview } from './ProjectPreview';

/** A project in the grid below the featured ones: smaller screenshot on top, the same details tighter. */
export function ProjectTile({ project }: { project: Project }) {
  return (
    <article className="text-base">
      <ProjectPreview project={project} sizes="(min-width: 768px) 504px, calc(100vw - 32px)" />
      <h3 className="mt-6 text-2xl">{project.name}</h3>
      <ProjectDetails project={project} />
    </article>
  );
}
