import type { LucideIcon } from 'lucide-react';
import type { SimpleIcon } from 'simple-icons';

/** A brand logo (simple-icons) or, for skills without one, a line icon (lucide). */
export type SkillIconSource = SimpleIcon | LucideIcon;

export type Skill = { name: string; icon: SkillIconSource };

export type SkillGroup = {
  group: string;
  /** Large faint icon in the card's corner. */
  icon: LucideIcon;
  /** Card fill: one of the pastel `bg-*` tokens. */
  tint: string;
  /** Width on the six-column grid. */
  span: 2 | 3 | 4;
  /** Big logo tiles instead of chips. */
  featured?: boolean;
  /** Still being learned: drawn dashed, like a sketch not yet inked. */
  learning?: boolean;
  items: Skill[];
};
