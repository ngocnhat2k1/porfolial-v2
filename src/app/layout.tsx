import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Patrick_Hand } from 'next/font/google';
import { SiteChrome } from '@/shared/components/SiteChrome';
import { site } from '@/shared/constants/site';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-be-vietnam',
});

const patrickHand = Patrick_Hand({
  subsets: ['latin', 'vietnamese'],
  weight: '400',
  variable: '--font-patrick',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: `${site.role} in Ho Chi Minh City. ${site.tagline}`,
  openGraph: { type: 'website', siteName: site.name, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#2457b3' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${beVietnam.variable} ${patrickHand.variable}`}>
      <body>
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
