import React from 'react';
import type { ComponentSize, ComponentTone, ComponentVariant } from '../types';
import { cx } from '../utils';
import { Button } from './Button';

export interface ButtonListItem {
  /** 按钮文字 */
  label: string;
  /** 点击回调 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 色调 */
  tone?: ComponentTone;
  /** 样式变体 */
  variant?: ComponentVariant;
  /** 尺寸 */
  size?: ComponentSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否占满宽度 */
  block?: boolean;
  /** 按钮前图标 */
  icon?: React.ReactNode;
  /** 自定义属性传递给 Button */
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonListGroup {
  /** 分组内按钮列表 */
  items: ButtonListItem[];
  /** 分组标签（可选） */
  label?: string;
}

export interface ButtonListProps {
  /** 按钮项列表（简单模式） */
  items?: ButtonListItem[];
  /** 分组按钮列表（分组模式，设置后 items 被忽略） */
  groups?: ButtonListGroup[];
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 按钮间距 */
  gap?: number | string;
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 是否允许换行（仅 horizontal 有效） */
  wrap?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * ButtonList - 按钮列表复合组件
 *
 * 基于 Button 组件构建的按钮编排容器，支持横向/纵向布局、自适应换行、
 * 分组分隔和全宽按钮，适用于工具栏、操作栏、表单按钮区等场景。
 */
export function ButtonList({
  items,
  groups,
  direction = 'horizontal',
  gap = 8,
  align = 'center',
  wrap = true,
  className,
  style,
}: ButtonListProps): React.JSX.Element {
  const isVertical = direction === 'vertical';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    flexWrap: wrap && !isVertical ? 'wrap' : 'nowrap',
    alignItems: align === 'stretch' ? 'stretch' : align,
    justifyContent: align === 'end' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
    ...style,
  };

  const renderItem = (item: ButtonListItem, index: number): React.JSX.Element => (
    <Button
      key={index}
      tone={item.tone ?? 'default'}
      variant={item.variant ?? 'primary'}
      size={item.size ?? 'md'}
      disabled={item.disabled}
      block={item.block}
      onClick={item.onClick}
      {...item.buttonProps}
    >
      {item.icon && <span className="md-btn-icon">{item.icon}</span>}
      {item.label}
    </Button>
  );

  const renderGroup = (group: ButtonListGroup, groupIndex: number): React.JSX.Element => (
    <div key={groupIndex} className="md-btn-group">
      {group.label && <span className="md-btn-group-label">{group.label}</span>}
      <div className="md-btn-group-items" style={{ display: 'flex', gap: typeof gap === 'number' ? `${gap}px` : gap, flexWrap: wrap && !isVertical ? 'wrap' : 'nowrap' }}>
        {group.items.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  );

  return (
    <div
      className={cx('md-btn-list', `md-btn-list-${direction}`, className)}
      style={containerStyle}
      role="group"
    >
      {groups
        ? groups.map((group, i) => renderGroup(group, i))
        : items?.map((item, i) => renderItem(item, i))}
    </div>
  );
}
