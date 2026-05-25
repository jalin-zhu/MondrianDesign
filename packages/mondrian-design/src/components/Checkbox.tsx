import React from 'react';
import { cx } from '../utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, ...props },
  ref,
) {
  return (
    <label className={cx('md-choice', className)}>
      <input ref={ref} type="checkbox" {...props} />
      {label ? <span>{label}</span> : null}
    </label>
  );
});

