// Career facts from master-profile.md. Unconfirmed items (Electron, PostgreSQL, SQLite,
// anything before 09/2023) are deliberately left out until the profile confirms them.

import {
  ArrowLeftRight,
  BookOpenText,
  Bot,
  BrainCircuit,
  Code,
  Cookie,
  Database,
  Flag,
  Gauge,
  GitPullRequest,
  GraduationCap,
  Layers,
  ListChecks,
  MonitorSmartphone,
  Palette,
  PawPrint,
  Plug,
  Repeat,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
  Workflow,
  Wrench,
} from 'lucide-react';
import {
  siAntdesign,
  siApollographql,
  siDocker,
  siDotnet,
  siFigma,
  siFramer,
  siGit,
  siGo,
  siGooglecloud,
  siGraphql,
  siGsap,
  siHtml5,
  siJavascript,
  siJest,
  siJira,
  siJsonwebtokens,
  siMui,
  siNextdotjs,
  siReact,
  siReactquery,
  siRedis,
  siRedux,
  siSass,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons';
import type { SkillGroup } from '../types/skill';

export const experience = [
  {
    company: 'The Mona (formerly MONA MEDIA)',
    role: 'Senior Frontend Developer',
    period: '09/2023 – Present',
    points: [
      'Work with a frontend team of 5+ people: task breakdown, mentoring, code review and technical coaching.',
      'Define technical solutions and make stack and architecture decisions for each project.',
      'Design and maintain frontend architecture for retail, e-commerce, ERP and e-learning platforms.',
      'Build reusable, scalable React and Next.js components using OOP, design patterns and SOLID principles.',
      'Optimise page load, rendering and API interaction to raise Lighthouse scores and SEO ranking.',
      'Integrate APIs from microservice-based backends, JWT/OAuth2 auth flows and WebSocket connections.',
      'Store tokens in httpOnly cookies with refresh-token rotation; build role-based UI (RBAC) for admin dashboards.',
      'Set coding standards, branching strategy and release readiness practices; unit and UI tests with Jest.',
    ],
  },
];

// Brand logos from simple-icons; skills with no logo get a line icon from lucide.
// `span` is the card's width on the six-column grid of the About page.
export const skills: SkillGroup[] = [
  {
    group: 'Core',
    icon: Code,
    tint: 'bg-butter',
    span: 3,
    featured: true,
    items: [
      { name: 'JavaScript (ES6+)', icon: siJavascript },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'HTML5', icon: siHtml5 },
      { name: 'CSS3 / SCSS', icon: siSass },
    ],
  },
  {
    group: 'Frameworks',
    icon: Layers,
    tint: 'bg-sky',
    span: 3,
    featured: true,
    items: [
      { name: 'Next.js (App & Pages Router)', icon: siNextdotjs },
      { name: 'React', icon: siReact },
      { name: 'Vite', icon: siVite },
    ],
  },
  {
    group: 'State and data',
    icon: Database,
    tint: 'bg-lilac',
    span: 3,
    items: [
      { name: 'TanStack Query', icon: siReactquery },
      { name: 'Zustand', icon: PawPrint },
      { name: 'Redux Toolkit', icon: siRedux },
      { name: 'Apollo GraphQL', icon: siApollographql },
      { name: 'Context API', icon: Share2 },
    ],
  },
  {
    group: 'UI and motion',
    icon: Palette,
    tint: 'bg-peach',
    span: 3,
    items: [
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'MUI', icon: siMui },
      { name: 'Ant Design', icon: siAntdesign },
      { name: 'GSAP', icon: siGsap },
      { name: 'Framer Motion', icon: siFramer },
      { name: 'Responsive / mobile-first', icon: MonitorSmartphone },
      { name: 'Web performance', icon: Gauge },
    ],
  },
  {
    group: 'APIs and security',
    icon: Plug,
    tint: 'bg-mint',
    span: 3,
    items: [
      { name: 'REST', icon: ArrowLeftRight },
      { name: 'GraphQL', icon: siGraphql },
      { name: 'WebSocket / Socket.IO', icon: siSocketdotio },
      { name: 'JWT / OAuth2', icon: siJsonwebtokens },
      { name: 'httpOnly cookies + refresh-token rotation', icon: Cookie },
      { name: 'RBAC UI', icon: ShieldCheck },
    ],
  },
  {
    group: 'AI',
    icon: BrainCircuit,
    tint: 'bg-rose',
    span: 3,
    items: [
      { name: 'RAG pipeline', icon: BookOpenText },
      { name: 'In-app AI chatbot', icon: Bot },
      { name: 'OpenAI API', icon: Sparkles },
      { name: 'Google Speech-to-Text', icon: siGooglecloud },
    ],
  },
  {
    group: 'Quality and tools',
    icon: Wrench,
    tint: 'bg-sky',
    span: 2,
    items: [
      { name: 'Jest', icon: siJest },
      { name: 'Git', icon: siGit },
      { name: 'Jira', icon: siJira },
      { name: 'Figma', icon: siFigma },
      { name: 'Docker (basic)', icon: siDocker },
      { name: 'CI/CD (basic)', icon: Workflow },
    ],
  },
  {
    group: 'Teamwork',
    icon: Flag,
    tint: 'bg-butter',
    span: 2,
    items: [
      { name: 'Team of 5+', icon: Users },
      { name: 'Task allocation', icon: ListChecks },
      { name: 'Code review', icon: GitPullRequest },
      { name: 'Mentoring', icon: GraduationCap },
      { name: 'Agile / Scrum', icon: Repeat },
    ],
  },
  {
    group: 'Learning now',
    icon: Sprout,
    tint: 'bg-paper',
    span: 2,
    learning: true,
    items: [
      { name: 'C# / .NET', icon: siDotnet },
      { name: 'SQL Server', icon: Database },
      { name: 'Redis', icon: siRedis },
      { name: 'Golang (familiar, AI-assisted)', icon: siGo },
      { name: 'Windows Server ops', icon: Server },
    ],
  },
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
