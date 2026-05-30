import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DialogWindow } from './DialogWindow';
import { MondrianProvider } from '../theme';

afterEach(cleanup);

function Wrapper({ children }: { children: React.ReactNode }) {
  return <MondrianProvider>{children}</MondrianProvider>;
}

describe('DialogWindow', () => {
  it('renders title, body, and action buttons', () => {
    render(
      <Wrapper>
        <DialogWindow
          open
          title="确认操作"
          actions={[
            { label: '取消', tone: 'default', variant: 'outlined', cancel: true },
            { label: '确认', tone: 'red' },
          ]}
        >
          <p>你确定要执行此操作吗？</p>
        </DialogWindow>
      </Wrapper>,
    );

    expect(screen.getByText('确认操作')).toBeInTheDocument();
    expect(screen.getByText('你确定要执行此操作吗？')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '取消' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '确认' })).toBeInTheDocument();
  });

  it('calls action onClick and closes dialog', async () => {
    const onOpenChange = vi.fn();
    const onConfirm = vi.fn();

    render(
      <Wrapper>
        <DialogWindow
          open
          onOpenChange={onOpenChange}
          title="确认"
          actions={[
            { label: '确定', onClick: onConfirm },
          ]}
        >
          内容
        </DialogWindow>
      </Wrapper>,
    );

    await userEvent.click(screen.getByRole('button', { name: '确定' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('prevents close when action onClick returns false', async () => {
    const onOpenChange = vi.fn();
    const onSave = vi.fn().mockReturnValue(false);

    render(
      <Wrapper>
        <DialogWindow
          open
          onOpenChange={onOpenChange}
          title="保存"
          actions={[
            { label: '保存', onClick: onSave },
          ]}
        >
          表单内容
        </DialogWindow>
      </Wrapper>,
    );

    await userEvent.click(screen.getByRole('button', { name: '保存' }));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('renders custom footer when provided', () => {
    // closable=false 避免 Modal 自动生成关闭按钮干扰测试
    render(
      <Wrapper>
        <DialogWindow
          open
          title="自定义页脚"
          closable={false}
          footer={<span data-testid="custom-footer">自定义内容</span>}
        >
          正文
        </DialogWindow>
      </Wrapper>,
    );

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    // 自定义 footer 不渲染默认 actions
    expect(screen.queryByRole('button', { name: '保存' })).not.toBeInTheDocument();
  });

  it('renders icon next to title when provided', () => {
    render(
      <Wrapper>
        <DialogWindow
          open
          title="带图标"
          icon={<span data-testid="dialog-icon">🔔</span>}
        >
          内容
        </DialogWindow>
      </Wrapper>,
    );

    expect(screen.getByTestId('dialog-icon')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { container: c1 } = render(
      <Wrapper>
        <DialogWindow open title="小" size="sm">小对话框</DialogWindow>
      </Wrapper>,
    );
    expect(c1.querySelector('.md-dialog-sm')).toBeInTheDocument();

    const { container: c2 } = render(
      <Wrapper>
        <DialogWindow open title="大" size="lg">大对话框</DialogWindow>
      </Wrapper>,
    );
    expect(c2.querySelector('.md-dialog-lg')).toBeInTheDocument();
  });

  it('is accessible with dialog role', () => {
    render(
      <Wrapper>
        <DialogWindow open title="无障碍对话框">
          内容
        </DialogWindow>
      </Wrapper>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
