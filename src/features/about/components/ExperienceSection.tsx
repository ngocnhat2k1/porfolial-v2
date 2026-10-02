import { experience } from '../constants/career';

/** Each job as a row: where, what role and when on the left, what it involved on the right. */
export function ExperienceSection() {
  return (
    <section aria-labelledby="experience-title">
      <h2 id="experience-title" className="text-3xl sm:text-4xl">
        Experience
      </h2>
      {experience.map((job) => (
        <article key={job.company} className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <h3 className="text-xl">{job.company}</h3>
            <p className="mt-2 font-bold text-studio">{job.role}</p>
            <p className="mt-1 text-ink-soft">{job.period}</p>
          </div>
          <ul className="max-w-prose list-disc space-y-2 pl-5 marker:text-studio">
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
