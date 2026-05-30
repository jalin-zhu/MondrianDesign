import type { HSL, PaletteGenOptions } from './types';
import type { MondrianTheme } from '../types';

/* ================================================================== */
/*  HSL 色彩空间工具                                                     */
/* ================================================================== */

/** hex (如 #d62828) → HSL */
export function hexToHsl(hex: string): HSL {
  let h = '';
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw[0] + raw[0] + raw[1] + raw[1] + raw[2] + raw[2] : raw;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let s = 0;
  let hue = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / d + 2) / 6;
        break;
      case b:
        hue = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: Math.round(hue * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/** HSL → hex (如 #d62828) */
export function hslToHex(hsl: HSL): string {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  if (s === 0) {
    const v = Math.round(l * 255);
    const hex = v.toString(16).padStart(2, '0');
    return `#${hex}${hex}${hex}`;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/** 色相归一化到 0-360 */
function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

/** 值钳位 */
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/* ================================================================== */
/*  WCAG 相对亮度 & 对比度                                              */
/* ================================================================== */

function linearize(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const full = hex.replace('#', '');
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

export function getContrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/* ================================================================== */
/*  种子色分类                                                           */
/* ================================================================== */

/** 判断种子色是否为暖色 (暖色: 红/橙/黄区间 0-60 或 330-360) */
function isWarmSeed(hsl: HSL): boolean {
  return hsl.h <= 60 || hsl.h >= 330;
}

/* ================================================================== */
/*  调色板生成核心算法                                                    */
/* ================================================================== */

/**
 * 从一个种子颜色自动生成完整的 6 色蒙德里安调色板。
 *
 * 蒙德里安配色原则：
 * - 三原色（红、黄、蓝）在色轮上互为 120° 三角关系
 * - 非彩色（黑、白、画布灰）作为平衡色
 * - 色彩饱和、大胆、几何化
 *
 * @param seedColor 种子颜色 (hex 格式, 如 '#d62828')
 * @param options   生成选项
 * @returns 6 色调色板
 */
export function generateMondrianPalette(
  seedColor: string,
  options: PaletteGenOptions = {},
): MondrianTheme['palette'] {
  const seed = hexToHsl(seedColor);
  const warm = options.forceWarm ?? isWarmSeed(seed);

  // ---- 确定三原色色相 ----
  // 暖色种子：红色使用种子色相，黄/蓝为三角补色
  // 冷色种子：蓝色使用种子色相，红/黄为三角补色
  let redH: number;
  let yellowH: number;
  let blueH: number;

  if (warm) {
    // forceWarm 且种子是冷色时，强制红色使用暖色色相 (0°)
    redH = options.forceWarm && !isWarmSeed(seed) ? 0 : wrapHue(seed.h);
    yellowH = wrapHue(redH + 120);
    blueH = wrapHue(redH + 240);
  } else {
    blueH = wrapHue(seed.h);
    redH = wrapHue(blueH + 120);
    yellowH = wrapHue(blueH + 240);
  }

  // ---- 色域映射：确保颜色在蒙德里安美学范围内 ----
  // 红：高饱和、中等亮度
  const red = hslToHex({
    h: redH,
    s: clamp(seed.s < 60 ? 85 : seed.s, 75, 95),
    l: clamp(seed.l < 30 ? 50 : seed.l, 40, 55),
  });

  // 黄：高饱和、高亮度 (黄色在低亮度下会变棕)
  const yellow = hslToHex({
    h: yellowH,
    s: clamp(seed.s, 80, 98),
    l: clamp(seed.l < 50 ? 60 : seed.l + 5, 52, 68),
  });

  // 蓝：中高饱和、中低亮度
  const blue = hslToHex({
    h: blueH,
    s: clamp(seed.s, 55, 85),
    l: clamp(seed.l > 60 ? 40 : seed.l, 30, 50),
  });

  // ---- 非彩色 (白/黑/画布) 根据种子色微调 ----
  // 白：微弱暖/冷偏移
  const white = hslToHex({
    h: seed.h,
    s: clamp(Math.round(seed.s * 0.08), 0, 8),
    l: 96 + Math.round(seed.l * 0.03),
  });

  // 黑：微弱暖/冷偏移
  const black = hslToHex({
    h: seed.h,
    s: clamp(Math.round(seed.s * 0.15), 0, 12),
    l: clamp(14 - Math.round(seed.l * 0.04), 8, 18),
  });

  // 画布：极淡的种子色
  const canvas = hslToHex({
    h: seed.h,
    s: clamp(Math.round(seed.s * 0.06), 0, 6),
    l: 93 + Math.round(seed.l * 0.05),
  });

  return { red, yellow, blue, white, black, canvas };
}
