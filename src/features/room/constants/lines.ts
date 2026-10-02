// What Nhật says in the room. Facts only: hobbies and the award come from his profile.

/** Shown one by one each time someone clicks Nhật. The first appears on arrival. */
export const greetings = [
  "Hi, I'm Nhật. Welcome to my room!",
  'Most things in here do something. Try clicking around.',
  'My projects are on the monitor.',
  'The keyboard on my desk and the guitar make real sounds.',
] as const;

export const objectLines = {
  phone: "After work it's mobile games, always on Android.",
  mic: 'I love to sing, too.',
  trophy: 'Employee of the Year 2025 at The Mona.',
} as const;

/** The sticky notes on the résumé board. */
export const pinnedSkills = ['Next.js', 'React', 'TypeScript', 'Tailwind', 'GSAP', 'GraphQL', 'TanStack Query', 'Zustand'] as const;
