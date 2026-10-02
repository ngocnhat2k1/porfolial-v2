import { cx } from '@/shared/utils/cx';
import type { SkillIconSource } from '../types/skill';

// Near-black brand colours (Next.js, Socket.IO, JWT) take the ink colour instead, so they match the line work.
const isDark = (hex: string) => [0, 2, 4].reduce((sum, i) => sum + parseInt(hex.slice(i, i + 2), 16), 0) < 120;

/** A skill's logo in its brand colour, or its line icon in ink. Decorative: the label next to it carries the meaning. */
export function SkillIcon({ icon, className }: { icon: SkillIconSource; className?: string }) {
  if ('path' in icon) {
    return (
      <svg viewBox="0 0 24 24" className={cx('shrink-0', className)} fill={isDark(icon.hex) ? 'currentColor' : `#${icon.hex}`} aria-hidden="true">
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = icon;
  return <Icon className={cx('shrink-0', className)} strokeWidth={2.2} aria-hidden="true" />;
}
