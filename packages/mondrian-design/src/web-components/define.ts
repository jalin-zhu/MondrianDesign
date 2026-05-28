import type { ComponentTone, ComponentSize, ComponentVariant } from '../shared';
import { cx, autoTextColor, sizePadding } from '../shared';

/* ================================================================== */
/*  基础 Custom Element 类                                              */
/* ================================================================== */

export abstract class MondrianElement extends HTMLElement {
  /** 子类声明要观察的属性列表 */
  static get observedAttributes(): string[] {
    return [];
  }

  /* ---------- tone ---------- */
  get tone(): ComponentTone {
    return (this.getAttribute('tone') as ComponentTone) || 'default';
  }
  set tone(v: ComponentTone) {
    if (v) this.setAttribute('tone', v);
    else this.removeAttribute('tone');
  }

  /* ---------- size ---------- */
  get size(): ComponentSize {
    return (this.getAttribute('size') as ComponentSize) || 'md';
  }
  set size(v: ComponentSize) {
    if (v) this.setAttribute('size', v);
    else this.removeAttribute('size');
  }

  /* ---------- variant ---------- */
  get variant(): ComponentVariant {
    return (this.getAttribute('variant') as ComponentVariant) || 'primary';
  }
  set variant(v: ComponentVariant) {
    if (v) this.setAttribute('variant', v);
    else this.removeAttribute('variant');
  }

  /* ---------- disabled ---------- */
  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }
  set disabled(v: boolean) {
    this.toggleAttribute('disabled', v);
  }

  /* ---------- block ---------- */
  get block(): boolean {
    return this.hasAttribute('block');
  }
  set block(v: boolean) {
    this.toggleAttribute('block', v);
  }

  /* ---------- error ---------- */
  get error(): boolean {
    return this.hasAttribute('error');
  }
  set error(v: boolean) {
    this.toggleAttribute('error', v);
  }

  // ---- 样式 ----

  /** 构建完整的 CSS class 字符串 */
  protected cls(): string {
    return cx(
      'md-control',
      `md-tone-${this.tone}`,
      this.sizingClass(),
      this.variantClass(),
      this.block ? 'md-button-block' : undefined,
      this.error ? 'md-field-error' : undefined,
    );
  }

  protected sizingClass(): string | false {
    if (this.size === 'sm') return 'md-size-sm';
    if (this.size === 'lg') return 'md-size-lg';
    return false;
  }

  protected variantClass(): string | false {
    if (this.variant === 'secondary') return 'md-button-secondary';
    if (this.variant === 'outlined') return 'md-button-outlined';
    return false;
  }

  /** 获取当前 tone 的文字色 */
  protected textColor(): string {
    return autoTextColor(this.tone);
  }

  /** 获取尺寸 padding */
  protected pad(): [string, string] {
    return sizePadding(this.size);
  }

  // ---- 生命周期 ----

  private _mounted = false;
  private _slotContent: Node[] = [];

  connectedCallback(): void {
    if (!this._mounted) {
      // 保存原始 light DOM 子节点（slot 内容）
      this._slotContent = Array.from(this.childNodes);
    }
    this.render();
  }

  attributeChangedCallback(_name: string, _old: string | null, _new: string | null): void {
    if (this._mounted) {
      this.render();
    }
  }

  /**
   * 首次渲染辅助：设置 innerHTML 后将保存的子节点移入 slot 容器。
   * @param html 要设置的 innerHTML
   * @param slotSelector CSS 选择器定位 slot 容器（子节点将被移入此元素）
   */
  protected firstRender(html: string, slotSelector: string): void {
    this.innerHTML = html;
    const container = this.querySelector(slotSelector);
    if (container && this._slotContent.length > 0) {
      for (const child of this._slotContent) {
        container.appendChild(child);
      }
    }
    this._slotContent = [];
    this._mounted = true;
  }

  /** 检查是否已完成首次渲染 */
  protected get mounted(): boolean {
    return this._mounted;
  }

  /** 派发自定义事件 */
  protected emit<T = unknown>(name: string, detail?: T): void {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true }),
    );
  }

  /** 子类实现渲染逻辑 */
  abstract render(): void;
}

/* ================================================================== */
/*  Custom Element 注册辅助                                             */
/* ================================================================== */

const DEFINED = new Set<string>();

export function defineElement(name: string, ctor: CustomElementConstructor): void {
  if (DEFINED.has(name)) return;
  customElements.define(name, ctor);
  DEFINED.add(name);
}
