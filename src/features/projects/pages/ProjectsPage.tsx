import type { Metadata } from 'next';
import { ArtImage } from '@/shared/components/ArtImage';
import { PageTransition } from '@/shared/components/PageTransition';
import { site } from '@/shared/constants/site';
import { ProjectCard } from '../components/ProjectCard';
import { categories, projects } from '../constants/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Every product ${site.name} has worked on since 2023: storefronts, learning platforms, SaaS back offices and AI tools.`,
};

const tints = ['bg-mint', 'bg-butter', 'bg-sky', 'bg-peach', 'bg-lilac', 'bg-rose'];
const iconOf = Object.fromEntries(categories.map((c) => [c.id, c.icon]));
const featured = projects.filter((project) => project.featured);

/** The work: three headline cards, then every other project in a four-column grid per category. */
export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-270 px-4 pt-28 pb-40">
        <header className="flex items-end justify-between gap-8 border-b-[2.5px] border-ink">
          <div className="max-w-prose pb-10">
            <h1 className="text-5xl sm:text-6xl">Projects</h1>
            <p className="mt-4 text-lg">
              Every product I have worked on since 2023, <strong>{projects.length} in all</strong>: storefronts, learning platforms, back offices and a few AI tools.
            </p>
          </div>
          {/* Sits on the header's bottom rule, like the desk stands on the floor. */}
          <div className="hidden w-48 shrink-0 sm:block lg:w-[260px]">
            <ArtImage name="char-desk" alt="Illustration of Nhật typing on a laptop at his desk" ratio={1.15} sizes="(min-width: 1024px) 260px, 192px" />
          </div>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              icon={iconOf[project.category]}
              tint={tints[i * 2]}
              sizes="(min-width: 1024px) 330px, (min-width: 768px) 50vw, calc(100vw - 32px)"
              featured
              eager={i === 0}
            />
          ))}
        </div>

        {categories.map(({ id, title, blurb, icon }, section) => {
          const list = projects.filter((project) => project.category === id && !project.featured);
          return (
            <section key={id} aria-labelledby={`work-${id}`} className="mt-24">
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 border-b-2 border-dashed border-ink/30 pb-4">
                <h2 id={`work-${id}`} className="flex items-baseline gap-3 text-3xl sm:text-4xl">
                  {title}
                  <span className="rounded-full border-2 border-ink bg-paper px-2.5 py-1 text-sm leading-none">{list.length}</span>
                </h2>
                <p className="max-w-sm text-ink-soft">{blurb}</p>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    icon={icon}
                    tint={tints[(i + section) % tints.length]}
                    sizes="(min-width: 1024px) 230px, (min-width: 640px) 50vw, calc(100vw - 32px)"
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </PageTransition>
  );
}
