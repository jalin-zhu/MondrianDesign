import React from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: number;
  tone?: ComponentTone;
}

function getInitials(name?: string): string {
  if (!name) {
    return '?';
  }
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  size = 36,
  tone = 'yellow',
  className,
  ...props
}: AvatarProps): React.JSX.Element {
  return (
    <span
      className={cx('md-avatar', `md-tone-${tone}`, className)}
      style={{ width: size, height: size, fontSize: Math.max(12, Math.floor(size * 0.36)) }}
      {...props}
    >
      {src ? <img src={src} alt={alt ?? name ?? 'avatar'} className="md-avatar-img" /> : getInitials(name)}
    </span>
  );
}

