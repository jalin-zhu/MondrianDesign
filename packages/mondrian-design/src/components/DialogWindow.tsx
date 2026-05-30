import React, { useCallback } from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';
import { Button } from './Button';
import { Modal } from './Modal';

export interface DialogAction {
  /** 按钮文字 */
  label: string;
  /** 点击回调，返回 false 可阻止自动关闭 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | false;
  /** 按钮色调 */
  tone?: ComponentTone;
  /** 按钮样式变体 */
  variant?: 'primary' | 'secondary' | 'outlined';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否是取消操作（按 Escape 或点遮罩关闭时会优先触发） */
  cancel?: boolean;
}

export interface DialogWindowProps {
  /** 是否打开 */
  open?: boolean;
  /** 默认打开状态 */
  defaultOpen?: boolean;
  /** 打开状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 对话框标题 */
  title: React.ReactNode;
  /** 正文内容 */
  children?: React.ReactNode;
  /** 页脚内容（设置后覆盖 actions） */
  footer?: React.ReactNode;
  /** 操作按钮配置数组 */
  actions?: DialogAction[];
  /** 对话框尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 点击遮罩是否关闭 */
  closeOnBackdrop?: boolean;
  /** 关闭按钮文字 */
  closeText?: string;
  /** 自定义类名 */
  className?: string;
  /** 标题旁图标 */
  icon?: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const SIZE_MAP: Record<string, string> = {
  sm: '360px',
  md: '560px',
  lg: '780px',
};

/**
 * DialogWindow - 对话框窗口复合组件
 *
 * 在基础 Modal 之上提供标题/正文/页脚的经典分区布局，支持配置化操作按钮、
 * 多档尺寸变体和标题图标，适用于确认、表单、详情展示等场景。
 */
export function DialogWindow({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  children,
  footer,
  actions,
  size = 'md',
  closable = true,
  closeOnBackdrop = true,
  closeText = '关闭',
  className,
  icon,
  style,
}: DialogWindowProps): React.JSX.Element | null {
  const maxWidth = SIZE_MAP[size] ?? SIZE_MAP.md;

  const handleActionClick = useCallback(
    (action: DialogAction) => (event: React.MouseEvent<HTMLButtonElement>): void => {
      const result = action.onClick?.(event);
      // 返回 false 则阻止关闭
      if (result === false) return;

      // 所有操作按钮点击后默认关闭对话框
      if (open === undefined) {
        // uncontrolled 模式由 Modal 内部处理
      }
      onOpenChange?.(false);
    },
    [open, onOpenChange],
  );

  const cancelAction = actions?.find((a) => a.cancel);

  return (
    <Modal
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(isOpen) => {
        // 如果关闭且有关闭回调，在关闭时触发 cancel 回调
        if (!isOpen && cancelAction) {
          const syntheticEvent = { preventDefault: () => {} } as React.MouseEvent<HTMLButtonElement>;
          cancelAction.onClick?.(syntheticEvent);
        }
        onOpenChange?.(isOpen);
      }}
      closeText={closable ? closeText : ''}
      aria-label={typeof title === 'string' ? title : undefined}
    >
      <div
        className={cx('md-dialog', `md-dialog-${size}`, className)}
        style={{ ...style, maxWidth }}
      >
        {/* 头部 */}
        <div className="md-dialog-header">
          {icon && <span className="md-dialog-icon">{icon}</span>}
          {title && <h2 className="md-dialog-title">{title}</h2>}
        </div>

        {/* 正文 */}
        {children && <div className="md-dialog-body">{children}</div>}

        {/* 页脚 */}
        <div className="md-dialog-footer">
          {footer ?? (
            <>
              {actions?.map((action, index) => (
                <Button
                  key={index}
                  tone={action.tone ?? (action.cancel ? 'default' : 'black')}
                  variant={action.variant ?? (action.cancel ? 'outlined' : 'primary')}
                  disabled={action.disabled}
                  onClick={handleActionClick(action)}
                >
                  {action.label}
                </Button>
              ))}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
