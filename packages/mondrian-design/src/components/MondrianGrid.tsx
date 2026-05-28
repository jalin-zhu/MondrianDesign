import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { GridCell, GridOptions, GridBreakpoints, MondrianGridConfig } from '../auto/types';
import { generateGridLayout, responsiveMaxColumns, responsiveGap } from '../auto/grid';
import { generateMondrianPalette } from '../auto/palette';
import { useMondrianTheme } from '../theme';
import { cx } from '../utils';

export interface MondrianGridProps extends GridOptions {
  /** 种子颜色，提供后自动生成整个网格的调色板 */
  seedColor?: string;
  /** 网格间距 (px 或 CSS 值)，支持响应式自动缩放 */
  gap?: number | string;
  /** 子元素 */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 蒙德里安自动排版网格。
 *
 * 自动将子元素排列成蒙德里安风格的非对称构图。
 * 如果提供 seedColor，将自动生成完整的蒙德里安调色板；
 * 否则使用父级 MondrianProvider 的主题。
 *
 * @example
 * ```tsx
 * <MondrianGrid seedColor="#d62828">
 *   <Card title="Hero">Main content</Card>
 *   <Card title="Side">Secondary</Card>
 *   <Badge>New</Badge>
 * </MondrianGrid>
 * ```
 */
export function MondrianGrid({
  seedColor,
  children,
  columns,
  gap = 12,
  ratio,
  dominantTone,
  breakpoints,
  className,
  style,
}: MondrianGridProps): React.JSX.Element {
  const parentTheme = useMondrianTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // ---- ResizeObserver: 监听容器宽度变化 ----
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // 初始宽度
    setContainerWidth(el.clientWidth);
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 自动或使用父级调色板
  const palette = useMemo(() => {
    if (seedColor) {
      return generateMondrianPalette(seedColor);
    }
    return parentTheme.palette;
  }, [seedColor, parentTheme.palette]);

  // 计算子元素数量
  const childArray = React.Children.toArray(children).filter(Boolean);
  const count = childArray.length;

  // 响应式最大列数
  const maxCols = useMemo(() => {
    if (containerWidth <= 0) return undefined;
    return responsiveMaxColumns(containerWidth, typeof gap === 'number' ? gap : 12, breakpoints);
  }, [containerWidth, gap, breakpoints]);

  // 响应式 gap
  const actualGap = useMemo(() => {
    if (typeof gap !== 'number') return gap;
    if (containerWidth <= 0) return `${gap}px`;
    return `${responsiveGap(containerWidth, gap)}px`;
  }, [containerWidth, gap]);

  // 生成网格布局
  const gridConfig: MondrianGridConfig = useMemo(
    () => generateGridLayout(count, { columns, ratio, dominantTone }, maxCols),
    [count, columns, ratio, dominantTone, maxCols],
  );

  // 首屏用 ref callback 避免 ResizeObserver 延迟导致的闪烁
  const setContainerRef = useCallback((el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (el && containerWidth === 0) {
      setContainerWidth(el.clientWidth);
    }
  }, [containerWidth]);

  return (
    <div
      ref={setContainerRef}
      className={cx('md-grid', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: gridConfig.columns,
        gridTemplateRows: gridConfig.rows,
        gridTemplateAreas: gridConfig.areas,
        gridAutoRows: 'minmax(80px, auto)',
        gap: actualGap,
        ...style,
      }}
    >
      {childArray.map((child, i) => {
        const cell = gridConfig.cells[i];
        if (!cell) return null;

        return (
          <div
            key={cell.area}
            className={cx('md-grid-cell', `md-tone-${cell.tone}`, cell.dominant && 'md-grid-cell-dominant')}
            style={{
              gridArea: cell.area,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
