import React from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  tone?: ComponentTone;
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { tone = 'white', error = false, className, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cx('md-control', 'md-field', 'md-textarea', `md-tone-${tone}`, error && 'md-field-error', className)}
      {...props}
    />
  );
});

