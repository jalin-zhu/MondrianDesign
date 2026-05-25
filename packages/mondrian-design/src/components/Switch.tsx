import React, { useId, useState } from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  tone?: ComponentTone;
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  tone = 'blue',
  className,
  disabled,
  ...props
}: SwitchProps): React.JSX.Element {
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const isChecked = checked ?? innerChecked;
  const id = useId();

  const toggle = (): void => {
    if (disabled) {
      return;
    }
    const next = !isChecked;
    if (checked === undefined) {
      setInnerChecked(next);
    }
    onCheckedChange?.(next);
  };

  return (
    <div className={cx('md-switch-wrap', className)}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={typeof label === 'string' ? label : undefined}
        className={cx('md-control', 'md-switch', isChecked && `md-tone-${tone}`)}
        onClick={toggle}
        disabled={disabled}
        {...props}
      >
        <span className={cx('md-switch-thumb', isChecked && 'md-switch-thumb-on')} aria-hidden="true" />
      </button>
      {label ? (
        <label htmlFor={id} className="md-switch-label">
          {label}
        </label>
      ) : null}
    </div>
  );
}

