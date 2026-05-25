import React from 'react';
import type { ComponentSize, ComponentTone, ComponentVariant } from '../types';
import { cx } from '../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  tone?: ComponentTone;
  size?: ComponentSize;
  block?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', tone = 'default', size = 'md', block = false, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx(
        'md-control',
        'md-button',
        `md-tone-${tone}`,
        variant === 'outlined' && 'md-button-outlined',
        size === 'sm' && 'md-size-sm',
        size === 'lg' && 'md-size-lg',
        block && 'md-button-block',
        className,
      )}
      {...props}
    />
  );
});

