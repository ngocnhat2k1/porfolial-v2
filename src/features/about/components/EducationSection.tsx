import { award, certificate, education } from '../constants/career';

/** School, award and certificate as one definition list, on the same columns as the sections above. */
export function EducationSection() {
  return (
    <section aria-labelledby="education-title">
      <h2 id="education-title" className="text-3xl sm:text-4xl">
        Education and awards
      </h2>
      <dl className="mt-8 grid gap-x-10 gap-y-2 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-y-8">
        <dt className="font-bold">Education</dt>
        <dd className="mb-6 md:mb-0">
          <p className="font-bold">{education.school}</p>
          <p>{education.major}</p>
          <p className="text-ink-soft">{education.period}</p>
          <p className="text-ink-soft">{education.note}</p>
        </dd>

        <dt className="font-bold">Award</dt>
        <dd className="mb-6 md:mb-0">
          <p className="font-bold">{award.title}</p>
          <p>{award.org}</p>
        </dd>

        <dt className="font-bold">Certificate</dt>
        <dd>
          <p className="font-bold">{certificate}</p>
        </dd>
      </dl>
    </section>
  );
}
