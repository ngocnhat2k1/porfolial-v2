import type { Metadata } from 'next';
import { award, certificate, education, experience, skills } from '@/features/about';
import { projects } from '@/features/projects';
import { PageTransition } from '@/shared/components/PageTransition';
import { site } from '@/shared/constants/site';
import { PrintButton } from '../components/PrintButton';
import { ResumeEntry } from '../components/ResumeEntry';
import { ResumeLink } from '../components/ResumeLink';
import { ResumeSection } from '../components/ResumeSection';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Résumé of ${site.name}, ${site.role} in ${site.location}.`,
};

// A4 with 14mm margins and print-sized type (everything is in rem). React hoists this into <head>
// and may keep it after you leave, so the rules that matter only apply while the résumé is on the page.
const printCss = `
  @page { size: A4; margin: 14mm; }
  @media print {
    html:has(#resume) { font-size: 9.5pt; }
    body:has(#resume) { background: #fff; }
  }
`;

/** One-column, ATS-friendly résumé: a paper sheet on screen, clean A4 pages in print. */
export default function ResumePage() {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-270 px-4 pt-28 pb-40 print:max-w-none print:p-0">
        <style href="resume-print" precedence="default">
          {printCss}
        </style>

        <div className="mx-auto max-w-[820px]">
          <div className="mb-6 flex justify-end print:hidden">
            <PrintButton />
          </div>

          <article
            id="resume"
            className="rounded-card border-[2.5px] border-ink bg-paper p-6 shadow-pop sm:p-12 print:border-0 print:bg-white print:p-0 print:text-black print:shadow-none"
          >
            <header>
              <h1 className="text-4xl sm:text-5xl">{site.name}</h1>
              <p className="mt-2 text-lg font-bold text-studio print:text-black">{site.role}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                <li>{site.location}</li>
                <li>
                  <ResumeLink href={`tel:${site.phone.replaceAll(' ', '')}`}>{site.phone}</ResumeLink>
                </li>
                <li>
                  <ResumeLink href={`mailto:${site.email}`}>{site.email}</ResumeLink>
                </li>
                <li>
                  <ResumeLink href={site.url} />
                </li>
                <li>
                  <ResumeLink href={site.github} />
                </li>
                <li>
                  <ResumeLink href={site.linkedin} />
                </li>
              </ul>
            </header>

            <ResumeSection title="Summary">
              <p>{site.summary}</p>
            </ResumeSection>

            <ResumeSection title="Experience">
              {experience.map((job) => (
                <ResumeEntry key={job.company} title={job.role} period={job.period} points={job.points}>
                  <p className="font-bold">{job.company}</p>
                </ResumeEntry>
              ))}
            </ResumeSection>

            <ResumeSection title="Selected projects">
              {projects.filter((project) => project.points).map((project) => (
                <ResumeEntry key={project.slug} title={project.name} period={project.period} points={project.points}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="font-bold">{project.role}</p>
                    {project.url ? <ResumeLink href={project.url} /> : <p className="text-ink-soft print:text-black">{project.status}</p>}
                  </div>
                  <p>
                    <span className="font-bold">Stack:</span> {project.stack.join(', ')}
                  </p>
                </ResumeEntry>
              ))}
            </ResumeSection>

            <ResumeSection title="Skills">
              <ul className="space-y-1">
                {skills.map(({ group, items }) => (
                  <li key={group}>
                    <span className="font-bold">{group}:</span> {items.map((item) => item.name).join(', ')}
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Education">
              <ResumeEntry title={education.school} period={education.period}>
                <p>{education.major}</p>
                <p>{education.note}</p>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Award">
              <p>
                <span className="font-bold">{award.title}</span>, {award.org}
              </p>
            </ResumeSection>

            <ResumeSection title="Certificate">
              <p>{certificate}</p>
            </ResumeSection>
          </article>
        </div>
      </main>
    </PageTransition>
  );
}
