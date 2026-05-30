import React, { useMemo } from 'react';
import type { AutoThemeOptions } from '../auto/types';
import { useMondrianAutoTheme } from '../auto/use-auto-theme';
import { MondrianProvider } from '../theme';
import { cx } from '../utils';

export interface MondrianCanvasProps extends AutoThemeOptions {
  /** 子元素（将在自动生成的蒙德里安主题下渲染） */
  children?: React.ReactNode;
  /** 模式: auto 自动生成主题, manual 使用父级主题 */
  mode?: 'auto' | 'manual';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 蒙德里安自动排版画布。
 *
 * 顶层的自动排版组件，内部自动生成完整的蒙德里安主题并
 * 通过 MondrianProvider 提供给所有子组件。
 * 适合作为整页或独立区块的包装器。
 *
 * @example
 * ```tsx
 * <MondrianCanvas seedColor="#1d4ed8" mode="auto">
 *   <MondrianGrid>
 *     <Card title="Section 1">...</Card>
 *     <Card title="Section 2">...</Card>
 *   </MondrianGrid>
 * </MondrianCanvas>
 * ```
 */
export function MondrianCanvas({
  seedColor,
  children,
  mode = 'auto',
  palette: paletteOptions,
  grid: gridOptions,
  baseFontSize,
  typeRatio,
  className,
  style,
}: MondrianCanvasProps): React.JSX.Element {
  const { theme } = useMondrianAutoTheme({
    seedColor,
    palette: paletteOptions,
    grid: gridOptions,
    baseFontSize,
    typeRatio,
  });

  if (mode === 'manual') {
    // manual 模式：仅透传子元素，使用父级主题
    return (
      <div className={cx('md-canvas', className)} style={style}>
        {children}
      </div>
    );
  }

  // auto 模式：包裹 MondrianProvider 以注入自动主题
  return (
    <MondrianProvider theme={theme}>
      <div className={cx('md-canvas', className)} style={style}>
        {children}
      </div>
    </MondrianProvider>
  );
}
