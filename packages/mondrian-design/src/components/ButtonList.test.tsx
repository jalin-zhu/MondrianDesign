import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ButtonList } from './ButtonList';
import type { ButtonListItem, ButtonListGroup } from './ButtonList';
import { MondrianProvider } from '../theme';

afterEach(cleanup);

function Wrapper({ children }: { children: React.ReactNode }) {
  return <MondrianProvider>{children}</MondrianProvider>;
}

describe('ButtonList', () => {
  const simpleItems: ButtonListItem[] = [
    { label: '编辑', tone: 'blue' },
    { label: '删除', tone: 'red', variant: 'outlined' },
    { label: '分享', tone: 'yellow' },
  ];

  function getList(container: HTMLElement): HTMLElement {
    return container.querySelector('.md-btn-list') as HTMLElement;
  }

  it('renders all buttons from items array', () => {
    render(
      <Wrapper>
        <ButtonList items={simpleItems} />
      </Wrapper>,
    );

    expect(screen.getByRole('button', { name: '编辑' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '删除' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '分享' })).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', async () => {
    const onClick = vi.fn();
    const items: ButtonListItem[] = [
      { label: '点击我', onClick },
    ];

    render(
      <Wrapper>
        <ButtonList items={items} />
      </Wrapper>,
    );

    await userEvent.click(screen.getByRole('button', { name: '点击我' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders horizontal direction by default', () => {
    const { container } = render(
      <Wrapper>
        <ButtonList items={simpleItems} />
      </Wrapper>,
    );

    const list = getList(container);
    expect(list.style.flexDirection).toBe('row');
  });

  it('renders vertical direction', () => {
    const { container } = render(
      <Wrapper>
        <ButtonList items={simpleItems} direction="vertical" />
      </Wrapper>,
    );

    const list = getList(container);
    expect(list.style.flexDirection).toBe('column');
  });

  it('renders groups with labels', () => {
    const groups: ButtonListGroup[] = [
      { label: '文件操作', items: [{ label: '新建' }, { label: '打开' }] },
      { label: '编辑操作', items: [{ label: '复制' }, { label: '粘贴' }] },
    ];

    render(
      <Wrapper>
        <ButtonList groups={groups} />
      </Wrapper>,
    );

    expect(screen.getByText('文件操作')).toBeInTheDocument();
    expect(screen.getByText('编辑操作')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '新建' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '复制' })).toBeInTheDocument();
  });

  it('renders disabled buttons', () => {
    const items: ButtonListItem[] = [
      { label: '不可用', disabled: true },
      { label: '可用' },
    ];

    render(
      <Wrapper>
        <ButtonList items={items} />
      </Wrapper>,
    );

    expect(screen.getByRole('button', { name: '不可用' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '可用' })).not.toBeDisabled();
  });

  it('applies custom gap', () => {
    const { container } = render(
      <Wrapper>
        <ButtonList items={simpleItems} gap={16} />
      </Wrapper>,
    );

    const list = getList(container);
    expect(list.style.gap).toBe('16px');
  });

  it('has role="group"', () => {
    const { container } = render(
      <Wrapper>
        <ButtonList items={simpleItems} />
      </Wrapper>,
    );

    const list = getList(container);
    expect(list).toHaveAttribute('role', 'group');
  });

  it('renders block buttons', () => {
    const items: ButtonListItem[] = [
      { label: '全宽按钮', block: true },
    ];

    render(
      <Wrapper>
        <ButtonList items={items} direction="vertical" />
      </Wrapper>,
    );

    const btn = screen.getByRole('button', { name: '全宽按钮' });
    expect(btn.className).toContain('md-button-block');
  });
});
