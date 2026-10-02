import { ExternalLink } from '@/shared/components/ExternalLink';
import { button } from '@/shared/ui/button';
import type { Project } from '../types/project';

/** Everything under a project's name: what it is, what Nhật did there, the stack and the link. */
export function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <p className="mt-2 font-bold text-studio">{project.kind}</p>
      {project.note && <p className="mt-1 w-fit -rotate-2 font-hand text-xl text-ink-soft">{project.note}</p>}
      <p className="mt-3 max-w-prose">{project.what}</p>

      <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1">
        <dt className="font-bold">Role</dt>
        <dd>{project.role}</dd>
        <dt className="font-bold">Period</dt>
        <dd>{project.period}</dd>
      </dl>

      <ul className="mt-4 max-w-prose list-disc space-y-1.5 pl-5 marker:text-studio">
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full border-2 border-ink bg-paper px-3 py-1.5 text-sm leading-none font-bold">
            {tech}
          </li>
        ))}
      </ul>

      {project.url && (
        <ExternalLink href={project.url} context={`: ${project.name}`} className={button('paper', 'mt-7')}>
          Visit site
        </ExternalLink>
      )}
    </>
  );
}
