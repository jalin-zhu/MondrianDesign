import React, { useMemo } from 'react';
import type { MondrianTheme } from '../types';
import type { GridOptions, MondrianGridConfig } from '../auto/types';
import { generateGridLayout } from '../auto/grid';
import { generateMondrianPalette } from '../auto/palette';
import { useMondrianTheme } from '../theme';
import { cx } from '../utils';

export interface MondrianGridProps extends GridOptions {
  /** 种子颜色，提供后自动生成整个网格的调色板 */
  seedColor?: string;
  /** 网格间距 (px 或 CSS 值) */
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
  className,
  style,
}: MondrianGridProps): React.JSX.Element {
  const parentTheme = useMondrianTheme();

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

  // 生成网格布局
  const gridConfig: MondrianGridConfig = useMemo(
    () => generateGridLayout(count, { columns, ratio, dominantTone }),
    [count, columns, ratio, dominantTone],
  );

  // gap 值
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;

  return (
    <div
      className={cx('md-grid', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: gridConfig.columns,
        gridTemplateRows: gridConfig.rows,
        gridTemplateAreas: gridConfig.areas,
        gap: gapValue,
        ...style,
      }}
    >
      {childArray.map((child, i) => {
        const cell = gridConfig.cells[i];
        if (!cell) return null;

        const bgColor = palette[getPaletteKey(cell.tone)];

        return (
          <div
            key={cell.area}
            className={cx('md-grid-cell', `md-tone-${cell.tone}`, cell.dominant && 'md-grid-cell-dominant')}
            style={{
              gridArea: cell.area,
              ...(bgColor ? {} : {}),
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

/** 将 ComponentTone 映射到 palette 键 */
function getPaletteKey(tone: string): keyof MondrianTheme['palette'] {
  const map: Record<string, keyof MondrianTheme['palette']> = {
    red: 'red',
    yellow: 'yellow',
    blue: 'blue',
    white: 'white',
    black: 'black',
    default: 'canvas',
  };
  return map[tone] ?? 'canvas';
}
