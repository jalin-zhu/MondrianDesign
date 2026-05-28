import type { ComponentTone, MondrianTheme } from '../types';
import type { GridCell, GridOptions, MondrianGridConfig } from './types';

/** 默认黄金比例 */
const PHI = 1.618;

/** 蒙德里安三原色色调 */
const PRIMARY_TONES: ComponentTone[] = ['red', 'yellow', 'blue'];
const NEUTRAL_TONES: ComponentTone[] = ['white', 'default'];

/* ================================================================== */
/*  网格排版引擎                                                        */
/* ================================================================== */

/**
 * 自动将 N 个子元素排列成蒙德里安风格的非对称网格布局。
 *
 * 排版原则：
 * - 行列数由 √n 取整确定
 * - 列宽应用黄金比例，创造非对称视觉张力
 * - 色彩分配：主色大色块 + 对比色小色块 + 留白
 *
 * @param count   子元素数量
 * @param options 排版选项
 * @returns CSS Grid 配置
 */
export function generateGridLayout(
  count: number,
  options: GridOptions = {},
): MondrianGridConfig {
  if (count <= 0) {
    return { columns: '1fr', rows: '1fr', areas: '', cells: [] };
  }

  const ratio = options.ratio ?? PHI;
  const cols = options.columns && options.columns > 0 ? options.columns : optimalColumns(count);
  const rows = Math.ceil(count / cols);

  // ---- 列宽 ----
  const colWidths = generateColumnWidths(cols, ratio);
  const columns = colWidths.join(' ');

  // ---- 行高 (等分) ----
  const rowsStr = Array(rows).fill('1fr').join(' ');

  // ---- 网格区域 ----
  const { areas, cells } = buildAreas(count, cols, rows, options);

  return { columns, rows: rowsStr, areas, cells };
}

/* ================================================================== */
/*  辅助函数                                                            */
/* ================================================================== */

/** 确定性洗牌：使用素数步长交错排列，渲染稳定 */
function deterministicShuffle<T>(arr: T[], count: number): T[] {
  const result: T[] = [];
  // 互质步长确保每个元素都被访问且不重复
  const step = nearestCoprime(arr.length, 7);
  let idx = 0;
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[idx]);
    idx = (idx + step) % arr.length;
  }
  return result.slice(0, count);
}

/** 找到与 n 互质的最接近 target 的数 */
function nearestCoprime(n: number, target: number): number {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  for (let d = 0; d < n; d++) {
    const a = target + d;
    if (a < n && gcd(n, a) === 1) return a;
    const b = target - d;
    if (b > 1 && gcd(n, b) === 1) return b;
  }
  return 1;
}

/** 最优列数：ceil(√n)，限制在 1-6 */
function optimalColumns(n: number): number {
  return Math.max(1, Math.min(6, Math.ceil(Math.sqrt(n))));
}

/** 生成黄金比例列宽序列 */
function generateColumnWidths(cols: number, ratio: number): string[] {
  if (cols === 1) return ['1fr'];

  const widths: string[] = [];
  // 第一列最大，后续列递减
  let weight = Math.pow(ratio, cols - 1);
  const total = Array.from({ length: cols }, (_, i) => Math.pow(ratio, cols - 1 - i)).reduce(
    (a, b) => a + b,
    0,
  );

  for (let i = 0; i < cols; i++) {
    const w = Math.pow(ratio, cols - 1 - i) / total;
    // 确保最小列不小于 0.15fr
    widths.push(`${Math.max(0.15, w).toFixed(3)}fr`);
  }

  return widths;
}

/** 构建 CSS grid-template-areas 字符串和 cells 配置 */
function buildAreas(
  count: number,
  cols: number,
  rows: number,
  options: GridOptions,
): { areas: string; cells: GridCell[] } {
  const cells: GridCell[] = [];
  const dominantTone = options.dominantTone ?? selectDominantTone(count);

  // 预分配色调：每个格子按蒙德里安规则分配
  const assignedTones = assignTones(count, dominantTone);

  const rowStrs: string[] = [];
  let idx = 0;

  for (let r = 0; r < rows; r++) {
    const rowCells: string[] = [];
    for (let c = 0; c < cols; c++) {
      if (idx >= count) {
        rowCells.push('.');
        continue;
      }
      const area = `a${idx}`;
      const tone = assignedTones[idx];
      const dominant = tone === dominantTone;

      rowCells.push(area);
      cells.push({ area, tone, dominant });
      idx++;
    }
    rowStrs.push(`"${rowCells.join(' ')}"`);
  }

  return { areas: rowStrs.join('\n'), cells };
}

/** 选择主色调：从三原色中轮选 */
function selectDominantTone(count: number): ComponentTone {
  // 基于元素数量选择：少元素用红色（冲击力），多元素用蓝色（更稳）
  if (count <= 2) return 'red';
  if (count <= 4) return 'yellow';
  return 'blue';
}

/**
 * 蒙德里安色彩分配算法。
 *
 * 规则：
 * - 30% 格子用主色（大色块）
 * - 20% 格子用对比色（从三原色中轮选非主色的其他色）
 * - 25% 留白
 * - 25% 画布色
 *
 * 分配时打散色块，避免同色相邻
 */
function assignTones(count: number, dominant: ComponentTone): ComponentTone[] {
  const tones: ComponentTone[] = new Array(count);

  // 计算各类型数量
  const domCount = Math.max(1, Math.round(count * 0.3));
  const accentCount = Math.max(0, Math.round(count * 0.2));
  const whiteCount = Math.max(1, Math.round(count * 0.25));
  const canvasCount = Math.max(0, count - domCount - accentCount - whiteCount);

  // 对比色：从三原色中排除主色后选择
  const accentOptions = PRIMARY_TONES.filter((t) => t !== dominant);
  if (accentOptions.length === 0) accentOptions.push('yellow'); // fallback

  // 构建分配序列
  const pool: ComponentTone[] = [
    ...Array(domCount).fill(dominant),
    ...Array(canvasCount).fill('default'),
    ...Array(whiteCount).fill('white'),
  ];

  // 交错插入对比色
  for (let i = 0; i < accentCount; i++) {
    pool.push(accentOptions[i % accentOptions.length]);
  }

  // 基于素数的确定性交错排列，避免同色聚集且跨渲染稳定
  const shuffled = deterministicShuffle(pool, count);

  // 应用序列（限制同色不连续超过 2 个）
  let consecutive = 0;
  let lastTone: ComponentTone | null = null;

  for (let i = 0; i < count; i++) {
    let picked = shuffled[i];
    if (picked === lastTone) {
      consecutive++;
      if (consecutive >= 2 && i + 1 < count) {
        // 与下一个交换
        [shuffled[i], shuffled[i + 1]] = [shuffled[i + 1], shuffled[i]];
        picked = shuffled[i];
        consecutive = 0;
      }
    } else {
      consecutive = 0;
    }
    tones[i] = picked;
    lastTone = picked;
  }

  return tones;
}
