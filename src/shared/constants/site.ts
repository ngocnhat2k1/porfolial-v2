// Identity and contact details used across features. Source: master-profile.md (confirmed items only).

export const site = {
  url: 'https://www.ngocnhat.info',
  name: 'Trần Ngọc Nhật',
  shortName: 'Nhật',
  role: 'Frontend Technical Leader',
  location: 'Tan Binh, Ho Chi Minh City',
  timezone: 'GMT+7',
  email: 'ngocnhat2k1@gmail.com',
  phone: '+84 395 115 641',
  github: 'https://github.com/ngocnhat2k1',
  linkedin: 'https://www.linkedin.com/in/tran-ngoc-nhat-109a06279/',
  tagline: 'I lead frontend teams and build fast React and Next.js products.',
  summary:
    'Frontend Technical Leader with 3+ years of React and Next.js, building e-commerce, ERP and e-learning platforms. I lead small frontend teams of 5+ people: picking the stack, shaping the architecture, reviewing code, and keeping performance and code quality high.',
  now: 'Since April 2026 I also own NHAHANG.AI end to end, a restaurant-management SaaS, where I am growing my backend and infrastructure skills.',
} as const;

export const nav = [
  { href: '/work', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
] as const;

export const menu = [{ href: '/', label: 'Balcony' }, { href: '/room', label: 'My room' }, ...nav] as const;
