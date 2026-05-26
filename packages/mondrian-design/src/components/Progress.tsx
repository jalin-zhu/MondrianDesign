import React from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  tone?: ComponentTone;
  showValue?: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function Progress({
  value,
  max = 100,
  tone = 'blue',
  showValue = true,
  className,
  ...props
}: ProgressProps): React.JSX.Element {
  const safeMax = max <= 0 ? 100 : max;
  const safeValue = clamp(value, 0, safeMax);
  const percent = (safeValue / safeMax) * 100;

  return (
    <div className={cx('md-progress-wrap', className)} {...props}>
      <div
        className="md-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
        aria-valuetext={`${Math.round(percent)}%`}
      >
        <div className={cx('md-progress-fill', `md-tone-${tone}`)} style={{ width: `${percent}%` }} />
      </div>
      {showValue ? <span className="md-progress-label">{Math.round(percent)}%</span> : null}
    </div>
  );
}

