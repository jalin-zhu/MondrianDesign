export type ComponentTone = 'default' | 'red' | 'yellow' | 'blue' | 'white' | 'black';
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'primary' | 'secondary' | 'outlined';

/** 通用类名拼接（框架无关） */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** tone → 推荐文字色 */
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

/** tone → 默认背景色 */
export function toneToBg(tone: ComponentTone): string {
  switch (tone) {
    case 'red': return '#d62828';
    case 'yellow': return '#f7d038';
    case 'blue': return '#1d4ed8';
    case 'white': return '#ffffff';
    case 'black': return '#111111';
    default: return '#f2f2f2';
  }
}

/** 大小 → padding 映射 */
export function sizePadding(size: ComponentSize): [string, string] {
  switch (size) {
    case 'sm': return ['4px', '8px'];
    case 'lg': return ['12px', '24px'];
    default: return ['8px', '16px'];
  }
}

/** 获取名字首字母 */
export function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
