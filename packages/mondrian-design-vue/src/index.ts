/**
 * MondrianDesign Vue 3 Wrappers
 *
 * 为 Web Components 提供 Vue 3 风格 API：
 * - 属性 → props（支持 v-model）
 * - CustomEvent → Vue emit
 * - slot → default slot 透传
 *
 * 使用前需导入 Web Components：
 * ```js
 * import 'mondrian-design/web-components';
 * ```
 */

import {
  defineComponent,
  h,
  type PropType,
  type VNode,
} from 'vue';

// ========== 类型 ==========

export type ComponentTone = 'default' | 'red' | 'yellow' | 'blue' | 'white' | 'black';
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'primary' | 'secondary' | 'outlined';

// ========== 工具 ==========

/** 为 Custom Element 包装创建 Vue 组件 */
function wrapElement(
  tag: string,
  propsDef: Record<string, unknown>,
  modelEvents?: Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  return defineComponent({
    props: {
      ...propsDef,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: null as any,
    },
    emits: Object.values(modelEvents ?? {}),
    setup(props, { slots, emit }: { slots: { default?: () => VNode[] }; emit: (event: string, ...args: unknown[]) => void }) {
      return () => {
        const attrs: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(props)) {
          if (key === 'ref') continue;
          if (typeof value === 'boolean') {
            // 布尔属性：true 时设置属性，false 时显式传 null 以触发 removeAttribute
            attrs[key] = value ? '' : null;
          } else if (value !== undefined && value !== null) {
            attrs[key] = value;
          }
        }
        // v-model 事件转发
        const on: Record<string, (e: CustomEvent) => void> = {};
        if (modelEvents) {
          for (const [eventName, emitName] of Object.entries(modelEvents)) {
            on[eventName] = (e: CustomEvent): void => emit(emitName, e.detail);
          }
        }
        const children = slots.default ? slots.default() : undefined;
        return h(tag, { ...attrs, on }, children);
      };
    },
  }) as ReturnType<typeof defineComponent>;
}

// ========== 组件 ==========

export const MdButton = /* #__PURE__ */ wrapElement('md-button', {
  tone: String as PropType<ComponentTone>,
  variant: String as PropType<ComponentVariant>,
  size: String as PropType<ComponentSize>,
  disabled: Boolean,
  block: Boolean,
});

export const MdBadge = /* #__PURE__ */ wrapElement('md-badge', {
  tone: String as PropType<ComponentTone>,
});

export const MdCard = /* #__PURE__ */ wrapElement('md-card', {
  tone: String as PropType<ComponentTone>,
  title: String,
  subtitle: String,
});

export const MdAvatar = /* #__PURE__ */ wrapElement('md-avatar', {
  tone: String as PropType<ComponentTone>,
  name: String,
  size: Number,
  src: String,
});

export const MdInput = /* #__PURE__ */ wrapElement('md-input', {
  tone: String as PropType<ComponentTone>,
  size: String as PropType<ComponentSize>,
  placeholder: String,
  error: Boolean,
  disabled: Boolean,
  type: String,
  value: String,
}, { 'md-change': 'update:modelValue' });

export const MdProgress = /* #__PURE__ */ wrapElement('md-progress', {
  tone: String as PropType<ComponentTone>,
  value: Number,
  max: Number,
  showvalue: Boolean,
});

export const MdSwitch = /* #__PURE__ */ wrapElement('md-switch', {
  tone: String as PropType<ComponentTone>,
  checked: Boolean,
  disabled: Boolean,
  label: String,
}, { 'md-change': 'update:checked' });

export const MdSkeleton = /* #__PURE__ */ wrapElement('md-skeleton', {
  width: [String, Number],
  height: [String, Number],
  circle: Boolean,
});

export const MdAlert = /* #__PURE__ */ wrapElement('md-alert', {
  tone: String as PropType<ComponentTone>,
  title: String,
  description: String,
});

export const MdModal = /* #__PURE__ */ wrapElement('md-modal', {
  open: Boolean,
  title: String,
}, { 'md-close': 'update:open' });

export const MdTabs = /* #__PURE__ */ wrapElement('md-tabs', {
  value: String,
  items: [String, Array],
}, { 'md-change': 'update:value' });
