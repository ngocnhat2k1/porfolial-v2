import { cx } from '@/shared/utils/cx';

const base =
  'inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink px-5 py-3 font-bold leading-none shadow-pop transition-[translate,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_var(--color-ink)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-ink)]';

const variants = {
  primary: 'bg-studio text-white',
  paper: 'bg-paper text-ink',
} as const;

/** Ink-outlined pill with a flat offset shadow, the same language as the illustrations' line art. */
export const button = (variant: keyof typeof variants = 'paper', className?: string) => cx(base, variants[variant], className);
