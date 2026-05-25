import React, { useEffect } from 'react';
import { Button } from './Button';

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  closeText?: string;
}

export function Modal({
  open = false,
  onOpenChange,
  title,
  children,
  closeText = 'Close',
}: ModalProps): React.JSX.Element | null {
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onOpenChange?.(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="md-modal-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange?.(false);
        }
      }}
    >
      <section role="dialog" aria-modal="true" className="md-modal">
        {title ? <h2>{title}</h2> : null}
        <div>{children}</div>
        <div style={{ marginTop: 16 }}>
          <Button tone="black" onClick={() => onOpenChange?.(false)}>
            {closeText}
          </Button>
        </div>
      </section>
    </div>
  );
}

