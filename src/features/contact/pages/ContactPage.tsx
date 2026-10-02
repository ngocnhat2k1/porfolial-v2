import type { Metadata } from 'next';
import { ExternalLink } from '@/shared/components/ExternalLink';
import { PageTransition } from '@/shared/components/PageTransition';
import { site } from '@/shared/constants/site';
import { button } from '@/shared/ui/button';
import { CopyEmailButton } from '../components/CopyEmailButton';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Email ${site.name} about frontend roles or projects.`,
};

const profiles = [
  { href: site.linkedin, label: 'LinkedIn' },
  { href: site.github, label: 'GitHub' },
];

/** One way to reach Nhật (email), two places to look him up, and where he is. */
export default function ContactPage() {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-270 px-4 pt-28 pb-40">
        <h1 className="text-5xl sm:text-6xl">Say hello</h1>
        <p className="mt-4 max-w-prose text-lg">If you have a frontend role or a project in mind, email me.</p>

        <div className="mt-12 max-w-3xl rounded-card border-[2.5px] border-ink bg-paper p-5 shadow-pop sm:p-10">
          <a
            id="contact-email"
            href={`mailto:${site.email}`}
            className="text-[clamp(1.25rem,6vw,3.25rem)] leading-tight font-extrabold wrap-anywhere text-studio underline decoration-[3px] underline-offset-[0.2em] hover:text-studio-deep"
          >
            {site.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <CopyEmailButton email={site.email} textId="contact-email" />
          </div>
        </div>

        <ul aria-label="Profiles" className="mt-12 flex flex-wrap gap-3">
          {profiles.map(({ href, label }) => (
            <li key={href}>
              <ExternalLink href={href} className={button('paper')}>
                {label}
              </ExternalLink>
            </li>
          ))}
        </ul>

        <dl className="mt-10 grid grid-cols-[auto_minmax(0,1fr)] gap-x-8 gap-y-2">
          <dt className="font-bold">Based in</dt>
          <dd>{site.location}</dd>
          <dt className="font-bold">Time zone</dt>
          <dd>{site.timezone}</dd>
        </dl>
      </main>
    </PageTransition>
  );
}
