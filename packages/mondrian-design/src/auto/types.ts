import type { ComponentTone, MondrianTheme } from '../types';

/* ------------------------------------------------------------------ */
/*  HSL 色彩空间                                                        */
/* ------------------------------------------------------------------ */

export interface HSL {
  h: number; // 0–360
  s: number; // 0–100
  l: number; // 0–100
}

/* ------------------------------------------------------------------ */
/*  调色板生成                                                           */
/* ------------------------------------------------------------------ */

export interface PaletteGenOptions {
  /** 暖色模式：当 seed 为冷色时强制使用暖色调红 (默认 false, 自动判断) */
  forceWarm?: boolean;
}

/* ------------------------------------------------------------------ */
/*  色调自动选择                                                         */
/* ------------------------------------------------------------------ */

export interface AutoToneOptions {
  /** 最低 WCAG 对比度要求 (默认 4.5) */
  minContrast?: number;
  /** 是否允许在候选不足时降级对比度 */
  fallback?: boolean;
}

export interface TonePairing {
  tone: ComponentTone;
  textColor: 'white' | 'black';
}

/* ------------------------------------------------------------------ */
/*  网格排版引擎                                                         */
/* ------------------------------------------------------------------ */

export interface GridCell {
  /** CSS grid 区域名 */
  area: string;
  /** 推荐色调 */
  tone: ComponentTone;
  /** 是否是大色块 (视觉重心) */
  dominant: boolean;
}

export interface MondrianGridConfig {
  /** CSS grid-template-columns 值 */
  columns: string;
  /** CSS grid-template-rows 值 */
  rows: string;
  /** grid-template-areas 字符串 */
  areas: string;
  /** 每个格子的详细配置 */
  cells: GridCell[];
}

export interface GridOptions {
  /** 手动指定列数 (0 = 自动) */
  columns?: number;
  /** 列间比例因子 (默认 1.618 黄金比例) */
  ratio?: number;
  /** 主色调 (用于大色块) */
  dominantTone?: ComponentTone;
  /** 响应式断点配置 */
  breakpoints?: GridBreakpoints;
}

/** 响应式列数断点 */
export interface GridBreakpoints {
  /** 移动端阈值 (px)，默认 480 */
  mobile?: number;
  /** 平板端阈值 (px)，默认 768 */
  tablet?: number;
  /** 桌面端阈值 (px)，默认 1024 */
  desktop?: number;
}

/* ------------------------------------------------------------------ */
/*  排版缩放系统                                                         */
/* ------------------------------------------------------------------ */

export interface MondrianTypeScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  /** 对应的行高建议 */
  lineHeights: Record<keyof Omit<MondrianTypeScale, 'lineHeights'>, number>;
  /** 基础字号 px */
  baseSize: number;
  /** 缩放因子 */
  ratio: number;
}

/* ------------------------------------------------------------------ */
/*  自动主题                                                            */
/* ------------------------------------------------------------------ */

export interface AutoThemeOptions {
  /** 种子颜色 (hex)，默认 '#d62828' (蒙德里安红) */
  seedColor?: string;
  /** 调色板生成选项 */
  palette?: PaletteGenOptions;
  /** 网格选项 */
  grid?: GridOptions;
  /** 基础字号 (px) */
  baseFontSize?: number;
  /** 排版缩放因子 */
  typeRatio?: number;
}

export interface AutoThemeResult {
  /** 完整 MondrianTheme */
  theme: MondrianTheme;
  /** 生成的调色板 */
  palette: MondrianTheme['palette'];
}
