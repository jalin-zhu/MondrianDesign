import type { MondrianTypeScale } from './types';

/** 默认基础字号 16px */
const DEFAULT_BASE = 16;

/** 默认缩放因子：大三度音阶 */
const DEFAULT_RATIO = 1.25;

/** 行高基数 */
const LINE_HEIGHT_BASE = 1.5;

/**
 * 自动生成蒙德里安风格的字号层级。
 *
 * 使用几何等比数列，从基础字号向两端缩放。
 * 大三度音阶 (1.25) 适合 UI 界面；
 * 黄金比例 (1.618) 适合更戏剧性的排版。
 *
 * @param baseSize 基础字号 px (默认 16)
 * @param ratio    缩放因子 (默认 1.25)
 */
export function generateTypeScale(
  baseSize: number = DEFAULT_BASE,
  ratio: number = DEFAULT_RATIO,
): MondrianTypeScale {
  const scale = {
    xs: roundPx(baseSize / ratio / ratio),
    sm: roundPx(baseSize / ratio),
    md: roundPx(baseSize),
    lg: roundPx(baseSize * ratio),
    xl: roundPx(baseSize * ratio * ratio),
    '2xl': roundPx(baseSize * ratio * ratio * ratio),
    '3xl': roundPx(baseSize * ratio * ratio * ratio * ratio),
  };

  // 行高：字号越大行高越紧凑
  const lineHeights = {
    xs: round(LINE_HEIGHT_BASE * 1.1, 2),
    sm: round(LINE_HEIGHT_BASE * 1.05, 2),
    md: round(LINE_HEIGHT_BASE, 2),
    lg: round(LINE_HEIGHT_BASE * 0.92, 2),
    xl: round(LINE_HEIGHT_BASE * 0.85, 2),
    '2xl': round(LINE_HEIGHT_BASE * 0.78, 2),
    '3xl': round(LINE_HEIGHT_BASE * 0.72, 2),
  } as MondrianTypeScale['lineHeights'];

  return {
    ...scale,
    lineHeights,
    baseSize,
    ratio,
  };
}

function roundPx(n: number): string {
  return `${Math.round(n)}px`;
}

function round(n: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}
