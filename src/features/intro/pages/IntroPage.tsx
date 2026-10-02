import Link from 'next/link';
import { ArtImage } from '@/shared/components/ArtImage';
import { MascotTransition } from '@/shared/components/MascotTransition';
import { PageTransition } from '@/shared/components/PageTransition';
import { Layer, SceneViewport, Stage } from '@/shared/components/Scene';
import { site } from '@/shared/constants/site';
import { button } from '@/shared/ui/button';
import styles from './IntroPage.module.css';

/** The balcony: Saigon at golden hour seen from Nhật's breeze-block balcony, one way in. */
export default function IntroPage() {
  return (
    <PageTransition>
      <main>
        <SceneViewport>
          <Stage ratio={21 / 9}>
            <div className={styles.city}>
              <ArtImage name="scene-city" alt="Ho Chi Minh City at golden hour, seen from a balcony with a white breeze-block wall" ratio={21 / 9} sizes="100vw" eager />
            </div>
            <Layer left={47.33} width={5.33} bottom={9} z={3} className={styles.mascot}>
              <MascotTransition>
                <div>
                  <ArtImage name="char-stand" alt="Illustration of Nhật standing on his balcony" ratio={0.28} sizes="(orientation: portrait) 45vw, 16vw" eager />
                </div>
              </MascotTransition>
            </Layer>
          </Stage>

          <section className={styles.card} aria-labelledby="intro-title">
            <h1 id="intro-title" className="text-[clamp(2rem,3.6vw,2.9rem)]">
              {site.name}
            </h1>
            <p className="mt-2 font-bold text-studio">{site.role} in Ho Chi Minh City</p>
            <p className="mt-3 text-ink-soft">{site.tagline}</p>
            <Link href="/room" transitionTypes={['door']} className={button('primary', 'mt-6')}>
              Enter my room
            </Link>
          </section>
        </SceneViewport>
      </main>
    </PageTransition>
  );
}
