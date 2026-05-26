import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const timerRef = useRef<number | null>(null);

  const handleClose = useCallback((): void => {
    if (open === undefined) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    // Clear any existing timer before setting a new one
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      handleClose();
    }, duration);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [duration, isOpen, handleClose]);

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

