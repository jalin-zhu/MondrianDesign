import type { ComponentTone, MondrianTheme } from '../types';
import type { AutoToneOptions, TonePairing } from './types';
import { getContrastRatio } from './palette';

/* ================================================================== */
/*  蒙德里安色调 → 背景色 映射表                                         */
/* ================================================================== */

const TONE_BG_MAP: Record<ComponentTone, keyof MondrianTheme['palette']> = {
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
  white: 'white',
  black: 'black',
  default: 'canvas',
};

/** 所有可用的色调 */
const ALL_TONES: ComponentTone[] = ['red', 'yellow', 'blue', 'white', 'black', 'default'];

/* ================================================================== */
/*  蒙德里安规则：色调 → 推荐文字色                                      */
/* ================================================================== */

/**
 * 根据蒙德里安设计规则，给定色调背景，推荐最佳文字颜色。
 *
 * 规则依据蒙德里安画作的色彩搭配：
 * - 黄色块上永远用黑色（黄底白字看不清）
 * - 黑底白字（经典对比）
 * - 红底/蓝底 → 白色（红色/蓝色在蒙德里安中是"重色"）
 * - 白底 → 黑色
 */
export function autoTextColor(tone: ComponentTone): 'white' | 'black' {
  switch (tone) {
    case 'yellow':
    case 'white':
    case 'default':
      return 'black';
    case 'red':
    case 'blue':
    case 'black':
      return 'white';
  }
}

/* ================================================================== */
/*  色调自动选择                                                        */
/* ================================================================== */

/**
 * 给定背景色和调色板，自动选出最适合的 ComponentTone。
 *
 * 分两步：
 * 1. WCAG 筛选：过滤出对比度 ≥ minContrast 的候选
 * 2. 蒙德里安规则优选：在候选中按美学优先级排序
 *
 * @param bgColor  背景色 (hex)
 * @param palette  当前调色板
 * @param options  选项 (默认 minContrast = 4.5)
 */
export function autoTone(
  bgColor: string,
  palette: MondrianTheme['palette'],
  options: AutoToneOptions = {},
): ComponentTone {
  const minContrast = options.minContrast ?? 4.5;
  const fallback = options.fallback ?? true;

  // 计算每个 tone 的对比度
  const scored: Array<{ tone: ComponentTone; contrast: number }> = ALL_TONES.map((tone) => {
    const toneBg = palette[TONE_BG_MAP[tone]];
    return { tone, contrast: getContrastRatio(toneBg, bgColor) };
  });

  // 筛选对比度达标的
  const passing = scored.filter((s) => s.contrast >= minContrast);

  if (passing.length > 0) {
    // 按蒙德里安美学优先级排序
    passing.sort(compareTonePreference);
    return passing[0].tone;
  }

  // 无达标候选时：启用 fallback 则选对比度最高的
  if (fallback) {
    scored.sort((a, b) => b.contrast - a.contrast);
    return scored[0].tone;
  }

  // 最终兜底
  return 'default';
}

/**
 * 色调美学优先级比较器。
 *
 * 蒙德里安偏好：
 * - 优先使用三原色（红 > 黄 > 蓝）→ 视觉冲击力
 * - 其次白色 → 干净留白
 * - 然后画布色 → 柔和区域
 * - 最后黑色 → 最大胆但需谨慎
 */
function compareTonePreference(
  a: { tone: ComponentTone; contrast: number },
  b: { tone: ComponentTone; contrast: number },
): number {
  // 优先选择对比度最高的
  if (Math.abs(a.contrast - b.contrast) > 0.5) {
    return b.contrast - a.contrast;
  }

  // 对比度接近时，按美学顺序
  const order: Record<ComponentTone, number> = {
    red: 0,
    yellow: 1,
    blue: 2,
    white: 3,
    default: 4,
    black: 5,
  };
  return (order[a.tone] ?? 99) - (order[b.tone] ?? 99);
}

/* ================================================================== */
/*  最佳配对                                                            */
/* ================================================================== */

/**
 * 给定背景色，同时返回最佳色调和推荐文字颜色。
 */
export function getBestPairing(
  bgColor: string,
  palette: MondrianTheme['palette'],
  options?: AutoToneOptions,
): TonePairing {
  const tone = autoTone(bgColor, palette, options);
  return { tone, textColor: autoTextColor(tone) };
}
