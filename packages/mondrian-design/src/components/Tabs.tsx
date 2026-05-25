import React, { useId, useMemo, useState } from 'react';
import { cx } from '../utils';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
}: TabsProps): React.JSX.Element {
  const fallbackKey = useMemo(() => items[0]?.key ?? '', [items]);
  const [internalValue, setInternalValue] = useState(defaultValue ?? fallbackKey);
  const activeValue = value ?? internalValue;
  const active = items.find((item) => item.key === activeValue) ?? items[0];
  const uid = useId();

  const setValue = (next: string): void => {
    if (value === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  return (
    <div className={cx('md-tabs', className)}>
      <div className="md-tabs-list" role="tablist" aria-label="Mondrian Tabs">
        {items.map((item) => {
          const selected = item.key === active?.key;
          return (
            <button
              key={item.key}
              role="tab"
              id={`${uid}-tab-${item.key}`}
              aria-controls={`${uid}-panel-${item.key}`}
              aria-selected={selected}
              className={cx('md-tab', selected && 'md-tab-active')}
              onClick={() => setValue(item.key)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {active ? (
        <div role="tabpanel" id={`${uid}-panel-${active.key}`} aria-labelledby={`${uid}-tab-${active.key}`}>
          {active.content}
        </div>
      ) : null}
    </div>
  );
}

