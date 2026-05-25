import React from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: ComponentTone;
}

export function Badge({ tone = 'yellow', className, children, ...props }: BadgeProps): React.JSX.Element {
  return (
    <span className={cx('md-badge', `md-tone-${tone}`, className)} {...props}>
      {children}
    </span>
  );
}

