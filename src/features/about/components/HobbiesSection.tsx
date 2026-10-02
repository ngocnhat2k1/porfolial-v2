import { ArtImage } from '@/shared/components/ArtImage';
import { hobbies } from '../constants/career';
import { HobbyIcon } from './HobbyIcon';

/** Hobbies with hand-drawn icons, beside the illustrated Nhật playing guitar. */
export function HobbiesSection() {
  return (
    <section aria-labelledby="hobbies-title" className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_300px]">
      <div>
        <h2 id="hobbies-title" className="text-3xl sm:text-4xl">
          Hobbies
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
          {hobbies.map(({ icon, label }) => (
            <li key={label} className="flex items-center gap-3 font-bold">
              <HobbyIcon name={icon} />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto w-full max-w-[300px]">
        <ArtImage name="char-guitar" alt="Illustration of Nhật playing an acoustic guitar" ratio={0.85} sizes="300px" />
      </div>
    </section>
  );
}
