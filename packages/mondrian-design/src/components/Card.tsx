import React from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  tone?: ComponentTone;
}

export function Card({
  title,
  subtitle,
  tone = 'white',
  className,
  children,
  ...props
}: CardProps): React.JSX.Element {
  return (
    <article className={cx('md-card', `md-tone-${tone}`, className)} {...props}>
      {title ? <h3 className="md-card-title">{title}</h3> : null}
      {subtitle ? <p className="md-card-subtitle">{subtitle}</p> : null}
      {children}
    </article>
  );
}
