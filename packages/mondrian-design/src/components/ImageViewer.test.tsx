import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ImageViewer } from './ImageViewer';
import { MondrianProvider } from '../theme';

afterEach(cleanup);

function Wrapper({ children }: { children: React.ReactNode }) {
  return <MondrianProvider>{children}</MondrianProvider>;
}

describe('ImageViewer', () => {
  it('renders a card with image, title, subtitle, and caption', () => {
    render(
      <Wrapper>
        <ImageViewer
          src="https://example.com/photo.jpg"
          alt="示例图片"
          title="美丽风景"
          subtitle="2024年夏"
          caption="拍摄于杭州西湖"
          zoomable={false}
        />
      </Wrapper>,
    );

    // 当 zoomable=false 时，img 保持其原生 role="img"
    expect(screen.getByRole('img', { name: '示例图片' })).toBeInTheDocument();
    expect(screen.getByText('美丽风景')).toBeInTheDocument();
    expect(screen.getByText('2024年夏')).toBeInTheDocument();
    expect(screen.getByText('拍摄于杭州西湖')).toBeInTheDocument();
  });

  it('opens lightbox modal on thumbnail click when zoomable', async () => {
    const { container } = render(
      <Wrapper>
        <ImageViewer
          src="https://example.com/photo.jpg"
          alt="测试图片"
          title="测试"
        />
      </Wrapper>,
    );

    // zoomable 时 img 有 role="button"
    const thumb = container.querySelector('.md-iv-thumb') as HTMLElement;
    await userEvent.click(thumb);

    // 灯箱应出现
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not open lightbox when zoomable is false', () => {
    render(
      <Wrapper>
        <ImageViewer
          src="https://example.com/photo.jpg"
          alt="不可缩放"
          zoomable={false}
        />
      </Wrapper>,
    );

    const img = screen.getByRole('img', { name: '不可缩放' });
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAttribute('role', 'button');
  });

  it('renders error state when image fails to load', () => {
    render(
      <Wrapper>
        <ImageViewer
          src="https://invalid.example/missing.jpg"
          alt="损坏图片"
          zoomable={false}
        />
      </Wrapper>,
    );

    const img = screen.getByRole('img', { name: '损坏图片' });
    fireEvent.error(img);

    expect(screen.getByText('图片加载失败')).toBeInTheDocument();
  });

  it('calls onZoomChange when zoom buttons are clicked', async () => {
    const onZoomChange = vi.fn();
    const { container } = render(
      <Wrapper>
        <ImageViewer
          src="https://example.com/photo.jpg"
          alt="缩放测试"
          onZoomChange={onZoomChange}
        />
      </Wrapper>,
    );

    // 打开灯箱
    const thumb = container.querySelector('.md-iv-thumb') as HTMLElement;
    await userEvent.click(thumb);

    // 点击放大按钮
    await userEvent.click(screen.getByRole('button', { name: '放大' }));
    expect(onZoomChange).toHaveBeenCalledWith(expect.any(Number));
  });

  it('renders skeleton placeholder before image loads', () => {
    const { container } = render(
      <Wrapper>
        <ImageViewer
          src="https://example.com/slow.jpg"
          alt="缓慢加载"
        />
      </Wrapper>,
    );

    expect(container.querySelector('.md-iv-skeleton')).toBeInTheDocument();
  });
});
