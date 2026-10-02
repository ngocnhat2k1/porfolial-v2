import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/shared/utils/cx';
import styles from './Scene.module.css';

type ViewportProps = {
  /**
   * `cover` crops like a background image. `explore` always shows the full height of the stage:
   * portrait phones pan sideways; on wide screens whatever the viewport paints shows beside it.
   */
  mode?: 'cover' | 'explore';
  className?: string;
  children: ReactNode;
};

/** Full-screen window onto an illustrated stage. */
export function SceneViewport({ mode = 'cover', className, children }: ViewportProps) {
  return <div className={cx(styles.viewport, mode === 'explore' && styles.explore, className)}>{children}</div>;
}

/** The canvas every layer is positioned on, 16:9 unless its art is wider. Children can size text with `cqw` units. */
export function Stage({ ratio, className, children }: { ratio?: number; className?: string; children: ReactNode }) {
  return (
    <div className={cx(styles.stage, className)} style={ratio ? ({ '--stage-ratio': ratio } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}

/** Position in percent of the stage. Floor objects anchor `bottom`, wall objects anchor `top`. */
export type Placement = { left: number; width: number; top?: number; bottom?: number; z?: number };

export function Layer({ left, width, top, bottom, z, className, children }: Placement & { className?: string; children: ReactNode }) {
  const style: CSSProperties = {
    left: `${left}%`,
    width: `${width}%`,
    top: top === undefined ? undefined : `${top}%`,
    bottom: bottom === undefined ? undefined : `${bottom}%`,
    zIndex: z,
  };
  return (
    <div className={cx('absolute', className)} style={style}>
      {children}
    </div>
  );
}
