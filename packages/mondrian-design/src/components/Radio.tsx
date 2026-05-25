import React from 'react';
import { cx } from '../utils';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, ...props },
  ref,
) {
  return (
    <label className={cx('md-choice', className)}>
      <input ref={ref} type="radio" {...props} />
      {label ? <span>{label}</span> : null}
    </label>
  );
});

