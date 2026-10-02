import type { MetadataRoute } from 'next';
import { menu, site } from '@/shared/constants/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return menu.map(({ href }) => ({
    url: new URL(href, site.url).toString(),
    changeFrequency: 'monthly',
    priority: href === '/' ? 1 : 0.7,
  }));
}
