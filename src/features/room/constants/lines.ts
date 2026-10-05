// What Nhật says in the room. Facts only: hobbies, the award and the skills come from his profile
// and projects; lines about the room itself make no claims about him.

/** Shown one by one each time someone hovers or taps Nhật. The first appears on arrival. */
export const greetings = [
  "Hi, I'm Nhật. Welcome to my room!",
  'Most things in here do something. Try hovering and clicking around.',
  'My projects are on the monitor.',
  'The keyboard on my desk and the guitar make real sounds.',
] as const;

/** Said when you hover an object (or tap it on a touch screen). */
export const objectLines = {
  phone: "After work it's mobile games, always on Android.",
  mic: 'I love to sing, too.',
  trophy: 'Employee of the Year 2025 at The Mona.',
  guitar: 'Guitar, piano and singing: my favourite hobbies.',
  duck: 'Rubber duck debugging: I explain the bug, the duck just listens.',
  cat: 'Careful, you just woke the cat.',
  monitor: 'Every project on this screen runs on Next.js. Click to see them all.',
  photo: "That's me. Click to read more about me.",
} as const;

/** Said after clicking, when it differs from the hover line. */
export const afterLines: Partial<Record<keyof typeof objectLines, string>> = {
  cat: 'That meow means hi.',
  duck: 'See? Saying it out loud is half the fix.',
};

export const lightLines = { off: 'Lights off. The city looks great at night.', on: 'Lights back on.' } as const;

export const musicLines = { on: 'A little music while we look around.', off: 'Back to the quiet.' } as const;

/** Saigon time on the wall clock, e.g. "18:05". */
export const clockLine = (time: string) => `It's ${time} here in Saigon.`;

/** The sticky notes on the résumé board, with what Nhật says when you hover one. */
export const pinnedSkills = {
  'Next.js': 'Next.js runs every project on my monitor.',
  React: 'React every day: reusable, scalable components for the team.',
  TypeScript: 'TypeScript on almost every project I work on.',
  Tailwind: 'Tailwind for fast, consistent UI. This site uses it too.',
  GSAP: 'GSAP for the transitions on Skillhub and Khanh Hung Academy.',
  GraphQL: 'GraphQL with Apollo on Cinestar, Bachlong and most of my stores.',
  'TanStack Query': 'I picked TanStack Query for Bachlong Mobile.',
  Zustand: 'Zustand for small, shared client state.',
} as const;
