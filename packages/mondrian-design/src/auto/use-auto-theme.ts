import { useMemo } from 'react';
import type { MondrianTheme } from '../types';
import type { AutoThemeOptions, AutoThemeResult } from './types';
import { generateMondrianPalette } from './palette';
import { generateTypeScale } from './typography';

/** 经典蒙德里安非调色板默认值 (间距/边框/阴影/动画) */
const DEFAULT_NON_PALETTE: Omit<MondrianTheme, 'palette'> = {
  border: { width: '2px', strongWidth: '4px', radius: '6px' },
  spacing: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
  shadow: {
    sm: '0 1px 0 rgba(17, 17, 17, 0.08)',
    md: '0 4px 0 rgba(17, 17, 17, 0.2)',
  },
  motion: { fast: '120ms', normal: '200ms' },
};

/**
 * 从种子颜色一键生成完整的蒙德里安自动主题。
 *
 * 集成了调色板生成和排版缩放，返回可直接传给 MondrianProvider 的
 * 完整 `MondrianTheme` 对象。
 *
 * @example
 * ```tsx
 * const { theme } = useMondrianAutoTheme({ seedColor: '#d62828' });
 * return <MondrianProvider theme={theme}><App /></MondrianProvider>;
 * ```
 */
export function useMondrianAutoTheme(options: AutoThemeOptions): AutoThemeResult {
  const { seedColor, palette: paletteOptions, baseFontSize = 16, typeRatio } = options;

  const palette = useMemo(
    () => generateMondrianPalette(seedColor, paletteOptions),
    [seedColor, paletteOptions],
  );

  const theme = useMemo<MondrianTheme>(() => {
    const typeScale = generateTypeScale(baseFontSize, typeRatio);
    return {
      palette,
      ...DEFAULT_NON_PALETTE,
    };
  }, [palette, baseFontSize, typeRatio]);

  return { theme, palette };
}
