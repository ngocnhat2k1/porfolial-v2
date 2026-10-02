// Career facts from master-profile.md. Unconfirmed items (Electron, PostgreSQL, SQLite,
// anything before 09/2023) are deliberately left out until the profile confirms them.

export const experience = [
  {
    company: 'The Mona (formerly MONA MEDIA)',
    role: 'Frontend Technical Leader / Team Lead',
    period: '09/2023 – Present',
    points: [
      'Lead a frontend team of 5+ people: task assignment, mentoring, code review and technical coaching.',
      'Act as Tech Lead: define technical solutions and make stack and architecture decisions for each project.',
      'Design and maintain frontend architecture for retail, e-commerce, ERP and e-learning platforms.',
      'Build reusable, scalable React and Next.js components using OOP, design patterns and SOLID principles.',
      'Optimise page load, rendering and API interaction to raise Lighthouse scores and SEO ranking.',
      'Integrate APIs from microservice-based backends, JWT/OAuth2 auth flows and WebSocket connections.',
      'Store tokens in httpOnly cookies with refresh-token rotation; build role-based UI (RBAC) for admin dashboards.',
      'Set coding standards, branching strategy and release readiness practices; unit and UI tests with Jest.',
    ],
  },
];

export const skills = [
  { group: 'Core', items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3 / SCSS'] },
  { group: 'Frameworks', items: ['Next.js (App & Pages Router)', 'React', 'Vite'] },
  { group: 'State and data', items: ['TanStack Query', 'Zustand', 'Redux Toolkit', 'Apollo GraphQL', 'Context API'] },
  { group: 'UI and motion', items: ['Tailwind CSS', 'MUI', 'Ant Design', 'GSAP', 'Framer Motion', 'Responsive / mobile-first', 'Web performance'] },
  { group: 'APIs and security', items: ['REST', 'GraphQL', 'WebSocket / Socket.IO', 'JWT / OAuth2', 'httpOnly cookies + refresh-token rotation', 'RBAC UI'] },
  { group: 'AI', items: ['RAG pipeline', 'In-app AI chatbot', 'OpenAI API', 'Google Speech-to-Text'] },
  { group: 'Quality and tools', items: ['Jest', 'Git', 'Jira', 'Figma', 'Docker (basic)', 'CI/CD (basic)'] },
  { group: 'Leadership', items: ['Team of 5+', 'Task allocation', 'Code review', 'Mentoring', 'Agile / Scrum'] },
  { group: 'Learning now', items: ['C# / .NET', 'SQL Server', 'Redis', 'Golang (familiar, AI-assisted)', 'Windows Server ops'], learning: true },
];

export const education = {
  school: 'Ho Chi Minh City University of Transport',
  major: 'Information Technology, Web Development',
  period: '10/2019 – 10/2023',
  note: 'GPA 3.2 (Good)',
};

export const award = { title: 'Employee of the Year 2025', org: 'The Mona (then MONA MEDIA)' };

export const certificate = 'TOEIC 500';

export const hobbies = [
  { icon: 'guitar', label: 'Guitar' },
  { icon: 'piano', label: 'Piano' },
  { icon: 'mic', label: 'Singing' },
  { icon: 'gamepad', label: 'Mobile games' },
  { icon: 'android', label: 'Android user' },
  { icon: 'laptop', label: 'MacBook at work' },
] as const;
