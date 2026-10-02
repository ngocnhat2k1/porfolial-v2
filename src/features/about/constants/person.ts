import { site } from '@/shared/constants/site';
import { education, skills } from './career';

/** schema.org Person: one @id so every page's structured data points at the same Nhật. */
export const person = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  alternateName: 'Tran Ngoc Nhat',
  url: site.url,
  image: `${site.url}/images/nhat-beach.jpg`,
  jobTitle: site.role,
  description: site.summary,
  email: site.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Ho Chi Minh City', addressCountry: 'VN' },
  worksFor: { '@type': 'Organization', name: 'The Mona', alternateName: 'MONA MEDIA' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
  knowsAbout: skills.flatMap(({ items }) => items.map((item) => item.name)),
  sameAs: [site.github, site.linkedin],
};
