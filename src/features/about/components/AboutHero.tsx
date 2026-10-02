import Image from 'next/image';
import { ArtImage } from '@/shared/components/ArtImage';
import { site } from '@/shared/constants/site';

/** Name, role and summary beside the illustrated Nhật, with a polaroid of the real one. */
export function AboutHero() {
  return (
    <header className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
      <div className="max-w-prose">
        <h1 className="text-5xl sm:text-6xl">{site.name}</h1>
        <p className="mt-3 text-xl font-bold text-studio">{site.role}</p>
        <p className="mt-6">{site.summary}</p>
        <p className="mt-4">{site.now}</p>
      </div>

      <div className="relative mx-auto w-full max-w-[400px] pb-8">
        <ArtImage name="char-window" alt="Illustration of Nhật leaning on an open wooden window" ratio={1} sizes="(min-width: 432px) 400px, calc(100vw - 32px)" eager />
        <figure className="absolute bottom-0 -left-2 w-[36%] -rotate-3 border-[2.5px] border-ink bg-paper p-2 shadow-pop lg:-left-10">
          <Image src="/images/nhat-beach.jpg" alt="Trần Ngọc Nhật by the sea at dusk" width={675} height={900} sizes="144px" className="block h-auto w-full" />
          <figcaption className="pt-1 text-center font-hand text-lg leading-tight">The real me</figcaption>
        </figure>
      </div>
    </header>
  );
}
