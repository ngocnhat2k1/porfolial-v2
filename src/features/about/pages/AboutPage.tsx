import type { Metadata } from 'next';
import { PageTransition } from '@/shared/components/PageTransition';
import { site } from '@/shared/constants/site';
import { AboutHero } from '../components/AboutHero';
import { EducationSection } from '../components/EducationSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { HobbiesSection } from '../components/HobbiesSection';
import { SkillsSection } from '../components/SkillsSection';

export const metadata: Metadata = {
  title: 'About',
  description: `${site.name}, ${site.role} in ${site.location}: experience, skills, hobbies and education.`,
};

/** Who Nhật is: the person, the work history, the skills and what he does for fun. */
export default function AboutPage() {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-270 space-y-24 px-4 pt-28 pb-40 sm:space-y-32">
        <AboutHero />
        <ExperienceSection />
        <SkillsSection />
        <HobbiesSection />
        <EducationSection />
      </main>
    </PageTransition>
  );
}
