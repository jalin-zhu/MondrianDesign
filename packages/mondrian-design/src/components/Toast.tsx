import React, { useEffect, useState } from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

export interface ToastProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: ComponentTone;
  duration?: number;
}

export function Toast({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  tone = 'black',
  duration = 2500,
}: ToastProps): React.JSX.Element | null {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const id = window.setTimeout(() => {
      if (open === undefined) {
        setInternalOpen(false);
      }
      onOpenChange?.(false);
    }, duration);
    return () => window.clearTimeout(id);
  }, [duration, isOpen, onOpenChange, open]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="md-toast-wrap" role="status" aria-live="polite">
      <div className={cx('md-toast', `md-tone-${tone}`)}>
        <p className="md-toast-title">{title}</p>
        {description ? <p className="md-toast-desc">{description}</p> : null}
      </div>
    </div>
  );
}

