import React from 'react';
import type { ComponentSize, ComponentTone } from '../types';
import { cx } from '../utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  tone?: ComponentTone;
  size?: ComponentSize;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { tone = 'white', size = 'md', error = false, className, ...props },
  ref,
) {
  return (
    <input
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
      aria-invalid={error || undefined}
      {...props}
    />
  );
});
