import { MondrianElement, defineElement } from './define';

/* ================================================================== */
/*  <md-modal> — 蒙德里安模态框                                         */
/* ================================================================== */

export class MdModal extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['open', 'title'];
  }

  get open(): boolean { return this.hasAttribute('open'); }
  set open(v: boolean) {
    this.toggleAttribute('open', v);
    if (v) this.lockScroll(true);
    else this.lockScroll(false);
  }

  get title(): string { return this.getAttribute('title') ?? ''; }
  set title(v: string) { this.setAttribute('title', v); }

  private _prevOverflow = '';
  private _escHandler: ((e: KeyboardEvent) => void) | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.open) {
        this.close();
      }
    };
    document.addEventListener('keydown', this._escHandler);
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this._escHandler!);
    this.lockScroll(false);
  }

  override attributeChangedCallback(name: string, old: string | null, newVal: string | null): void {
    if (name === 'open') {
      if (newVal !== null) this.lockScroll(true);
      else this.lockScroll(false);
    }
    super.attributeChangedCallback(name, old, newVal);
  }

  private lockScroll(lock: boolean): void {
    if (lock) {
      this._prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = this._prevOverflow;
    }
  }

  private close(): void {
    this.open = false;
    this.emit('md-close');
  }

  override render(): void {
    if (!this.open) {
      // 隐藏已有的 backdrop
      const backdrop = this.querySelector('.md-modal-backdrop') as HTMLElement | null;
      if (backdrop) backdrop.style.display = 'none';
      return;
    }

    const existingBackdrop = this.querySelector('.md-modal-backdrop') as HTMLElement | null;
    if (existingBackdrop) {
      // 已渲染过，只需显示并更新标题
      existingBackdrop.style.display = '';
      const titleEl = existingBackdrop.querySelector('.md-modal-title') as HTMLElement | null;
      if (this.title) {
        if (titleEl) titleEl.textContent = this.title;
        else {
          const section = existingBackdrop.querySelector('section')!;
          const h2 = document.createElement('h2');
          h2.className = 'md-modal-title';
          h2.style.cssText = 'margin:0 0 12px;font-size:1.25rem;font-weight:700';
          h2.textContent = this.title;
          section.insertBefore(h2, section.firstChild);
        }
      } else if (titleEl) {
        titleEl.remove();
      }
      // 更新 aria-label
      const section = existingBackdrop.querySelector('section')!;
      section.setAttribute('aria-label', this.title || 'dialog');
      return;
    }

    // 首次渲染
    const t = this.title
      ? `<h2 class="md-modal-title" style="margin:0 0 12px;font-size:1.25rem;font-weight:700">${this.title}</h2>`
      : '';
    this.firstRender(
      `<div class="md-modal-backdrop" style="position:fixed;inset:0;background:rgba(17,17,17,.55);display:flex;align-items:center;justify-content:center;z-index:50;animation:md-fade-in .2s ease"><section role="dialog" aria-modal="true" aria-label="${this.title || 'dialog'}" class="md-modal" style="background:var(--md-white);border:4px solid #111;width:min(560px,92vw);padding:16px;animation:md-scale-in .2s ease">${t}<div class="md-modal-body" style="margin-bottom:12px"></div><div class="md-modal-close-area" style="margin-top:16px;display:flex;justify-content:flex-end"><button class="md-control md-button md-tone-black" style="padding:8px 16px;font-weight:700;cursor:pointer">Close</button></div></section></div>`,
      '.md-modal-body',
    );
    // 点击背景关闭
    const backdrop = this.querySelector('.md-modal-backdrop')!;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });
    // 关闭按钮
    this.querySelector('.md-modal-close-area button')?.addEventListener('click', () => this.close());
  }
}
defineElement('md-modal', MdModal);


/* ================================================================== */
/*  <md-tabs> — 蒙德里安标签页                                          */
/* ================================================================== */

export class MdTabs extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['value', 'items'];
  }

  get value(): string { return this.getAttribute('value') ?? ''; }
  set value(v: string) { this.setAttribute('value', v); }

  get items(): string { return this.getAttribute('items') || '[]'; }
  set items(v: string) { this.setAttribute('items', v); }

  private get parsedItems(): Array<{ key: string; label: string; content: string }> {
    try {
      return JSON.parse(this.items);
    } catch {
      return [];
    }
  }

  override render(): void {
    const list = this.parsedItems;
    if (list.length === 0) { this.innerHTML = ''; return; }

    const active = list.find((i) => i.key === this.value) || list[0];
    const uid = 'md-tabs-' + Math.random().toString(36).slice(2, 8);

    const tabBtns = list
      .map(
        (item) => {
          const sel = item.key === active.key;
          return `<button role="tab" id="${uid}-tab-${item.key}" aria-controls="${uid}-panel-${item.key}" aria-selected="${sel}" class="md-tab ${sel ? 'md-tab-active' : ''}" style="border:2px solid #111;background:${sel ? 'var(--md-yellow)' : 'var(--md-white)'};padding:8px 12px;font-weight:700;cursor:pointer;transition:background .12s ease">${item.label}</button>`;
        },
      )
      .join('');

    this.innerHTML = `
      <div class="md-tabs" style="display:grid;gap:12px">
        <div class="md-tabs-list" role="tablist" aria-label="Tabs" style="display:flex;gap:8px;border-bottom:2px solid #111;padding-bottom:4px">${tabBtns}</div>
        <div role="tabpanel" id="${uid}-panel-${active.key}" aria-labelledby="${uid}-tab-${active.key}">${active.content}</div>
      </div>`;

    // 绑定点击事件
    list.forEach((item) => {
      const btn = this.querySelector(`#${uid}-tab-${item.key}`) as HTMLButtonElement;
      btn?.addEventListener('click', () => {
        this.value = item.key;
        this.emit('md-change', { value: item.key });
        this.render();
      });
    });
  }
}
defineElement('md-tabs', MdTabs);
