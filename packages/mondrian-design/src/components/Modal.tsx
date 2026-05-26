import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './Button';

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  closeText?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export function Modal({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  children,
  closeText = 'Close',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}: ModalProps): React.JSX.Element | null {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const handleClose = useCallback((): void => {
    if (open === undefined) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  }, [open, onOpenChange]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="md-modal-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? (typeof title === 'string' ? title : undefined)}
        aria-describedby={ariaDescribedby}
        className="md-modal"
      >
        {title ? <h2 className="md-modal-title">{title}</h2> : null}
        <div className="md-modal-body">{children}</div>
        <div className="md-modal-close-area">
          <Button tone="black" onClick={handleClose}>
            {closeText}
          </Button>
        </div>
      </section>
    </div>
  );
}

