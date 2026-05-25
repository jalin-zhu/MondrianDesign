import React from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  tone?: ComponentTone;
  action?: React.ReactNode;
}

export function Alert({
  title,
  description,
  tone = 'yellow',
  action,
  className,
  children,
  ...props
}: AlertProps): React.JSX.Element {
  return (
    <div className={cx('md-alert', `md-tone-${tone}`, className)} role="alert" {...props}>
      {title ? <p className="md-alert-title">{title}</p> : null}
      {description ? <p className="md-alert-desc">{description}</p> : null}
      {children}
      {action ? <div className="md-alert-action">{action}</div> : null}
    </div>
  );
}
