import React from 'react';
import type { ComponentSize, ComponentTone } from '../types';
import { cx } from '../utils';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  tone?: ComponentTone;
  size?: ComponentSize;
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { tone = 'white', size = 'md', error = false, className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cx(
        'md-control',
        'md-field',
        `md-tone-${tone}`,
        size === 'sm' && 'md-size-sm',
        size === 'lg' && 'md-size-lg',
        error && 'md-field-error',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
