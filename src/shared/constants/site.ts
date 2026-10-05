// Identity and contact details used across features. Source: master-profile.md (confirmed items only).

export const site = {
  url: 'https://www.ngocnhat.info',
  name: 'Trần Ngọc Nhật',
  shortName: 'Nhật',
  role: 'Senior Frontend Developer',
  location: 'Tan Binh, Ho Chi Minh City',
  timezone: 'GMT+7',
  email: 'ngocnhat2k1@gmail.com',
  phone: '+84 395 115 641',
  github: 'https://github.com/ngocnhat2k1',
  linkedin: 'https://www.linkedin.com/in/tran-ngoc-nhat-109a06279/',
  tagline: 'I build fast React and Next.js products, from architecture to release.',
  summary:
    'Senior Frontend Developer with 3+ years of React and Next.js, building e-commerce, ERP and e-learning platforms. On frontend teams of 5+ people I pick the stack, shape the architecture, review code, and keep performance and code quality high.',
  now: 'Since April 2026 I also own NHAHANG.AI end to end, a restaurant-management SaaS, where I am growing my backend and infrastructure skills.',
} as const;

export const nav = [
  { href: '/work', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
] as const;

export const menu = [{ href: '/', label: 'Balcony' }, { href: '/room', label: 'My room' }, ...nav] as const;
