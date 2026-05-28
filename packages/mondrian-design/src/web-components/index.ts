/**
 * MondrianDesign Web Components
 *
 * 框架无关的 Custom Elements。导入此文件即可在任何框架中使用：
 *
 * ```html
 * <script type="module" src="mondrian-design/dist/web-components.js"></script>
 * <md-button tone="red">Click me</md-button>
 * ```
 *
 * 或在 JS 中按需导入：
 * ```js
 * import 'mondrian-design/dist/web-components.js';
 * ```
 *
 * SSR 兼容: Web Components 仅在浏览器端注册，SSR 环境中无副作用。
 */

// 基础设施
export { MondrianElement, defineElement } from './define';

// 简单组件 (9)
export { MdButton } from './md-elements';
export { MdBadge } from './md-elements';
export { MdCard } from './md-elements';
export { MdAvatar } from './md-elements';
export { MdInput } from './md-elements';
export { MdProgress } from './md-elements';
export { MdSwitch } from './md-elements';
export { MdSkeleton } from './md-elements';
export { MdAlert } from './md-elements';

// 复杂组件 (2)
export { MdModal } from './md-complex';
export { MdTabs } from './md-complex';

/**
 * 一次性注册所有 11 个蒙德里安 Custom Elements。
 * 调用后即可在 HTML 中直接使用所有 `<md-*>` 标签。
 *
 * 注意：仅浏览器环境可用，SSR 时跳过。
 */
export function autoDefineAll(): void {
  if (typeof customElements === 'undefined') return;
  // 所有的 defineElement 调用已在各模块顶层执行，
  // 只需确保这些模块已被 import。
  // 如果按需导入单个组件，只需 import 对应模块。
}
