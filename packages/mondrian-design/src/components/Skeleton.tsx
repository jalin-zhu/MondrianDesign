import React from 'react';
import { cx } from '../utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
}

export function Skeleton({
  width = '100%',
  height = 16,
  circle = false,
  className,
  style,
  ...props
}: SkeletonProps): React.JSX.Element {
  return (
    <div
      className={cx('md-skeleton', circle && 'md-skeleton-circle', className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

