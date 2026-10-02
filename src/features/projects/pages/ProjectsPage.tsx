import type { Metadata } from 'next';
import { ArtImage } from '@/shared/components/ArtImage';
import { PageTransition } from '@/shared/components/PageTransition';
import { site } from '@/shared/constants/site';
import { FeaturedProject } from '../components/FeaturedProject';
import { ProjectTile } from '../components/ProjectTile';
import { projects } from '../constants/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Products ${site.name} has built and led, from cinema booking and e-commerce to e-learning and a restaurant SaaS.`,
};

const featured = projects.filter((project) => project.featured);
const others = projects.filter((project) => !project.featured);

/** The work: headline projects as large rows, the rest in a tighter two-column grid. */
export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-270 px-4 pt-28 pb-40">
        <header className="flex items-end justify-between gap-8 border-b-[2.5px] border-ink">
          <div className="max-w-prose pb-10">
            <h1 className="text-5xl sm:text-6xl">Projects</h1>
            <p className="mt-4 text-lg">Products I have worked on, from cinema booking to a restaurant SaaS, and my part in each.</p>
          </div>
          {/* Sits on the header's bottom rule, like the desk stands on the floor. */}
          <div className="hidden w-48 shrink-0 sm:block lg:w-[260px]">
            <ArtImage name="char-desk" alt="Illustration of Nhật typing on a laptop at his desk" ratio={1.15} sizes="(min-width: 1024px) 260px, 192px" />
          </div>
        </header>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {featured.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} eager={index === 0} />
          ))}
        </div>

        <section aria-labelledby="more-projects" className="mt-28 sm:mt-36">
          <h2 id="more-projects" className="text-3xl sm:text-4xl">
            More projects
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {others.map((project) => (
              <ProjectTile key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
