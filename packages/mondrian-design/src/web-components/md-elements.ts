import { MondrianElement, defineElement } from './define';
import { cx } from '../shared';

/** <md-button> — 蒙德里安按钮 */
export class MdButton extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['tone', 'variant', 'size', 'disabled', 'block'];
  }

  override render(): void {
    const [py, px] = this.pad();
    if (!this.mounted) {
      this.firstRender(
        `<button class="md-button md-tone-${this.tone}" style="padding:${py} ${px};font-weight:700;cursor:pointer;border-radius:0" ${this.disabled ? 'disabled' : ''}></button>`,
        'button',
      );
      const btn = this.querySelector('button');
      btn?.addEventListener('click', () => this.emit('md-click'));
      return;
    }
    // 增量更新
    const btn = this.querySelector('button');
    if (!btn) return;
    btn.className = `md-button md-tone-${this.tone} ${this.sizingClass() || ''} ${this.variantClass() || ''} ${this.block ? 'md-button-block' : ''}`.trim();
    btn.style.padding = `${py} ${px}`;
    if (this.disabled) btn.setAttribute('disabled', '');
    else btn.removeAttribute('disabled');
  }
}
defineElement('md-button', MdButton);


/** <md-badge> — 蒙德里安标签 */
export class MdBadge extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['tone'];
  }

  override render(): void {
    if (!this.mounted) {
      this.firstRender(
        `<span class="md-badge md-tone-${this.tone}" style="font-weight:700;letter-spacing:.05em"></span>`,
        'span',
      );
      return;
    }
    const span = this.querySelector('span');
    if (span) span.className = `md-badge md-tone-${this.tone}`;
  }
}
defineElement('md-badge', MdBadge);


/** <md-card> — 蒙德里安卡片 */
export class MdCard extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['tone', 'title', 'subtitle'];
  }

  get title(): string { return this.getAttribute('title') ?? ''; }
  set title(v: string) { this.setAttribute('title', v); }
  get subtitle(): string | null { return this.getAttribute('subtitle'); }
  set subtitle(v: string | null) { if (v) this.setAttribute('subtitle', v); else this.removeAttribute('subtitle'); }

  override render(): void {
    if (!this.mounted) {
      const t = this.title ? `<h3 class="md-card-title" style="margin:0 0 4px">${this.title}</h3>` : '';
      const s = this.subtitle ? `<p class="md-card-subtitle" style="margin:0 0 12px;opacity:.85">${this.subtitle}</p>` : '';
      this.firstRender(
        `<article class="md-card md-tone-${this.tone}" style="padding:16px">${t}${s}<div class="md-card-body"></div></article>`,
        '.md-card-body',
      );
      return;
    }
    // 增量更新
    const article = this.querySelector('article');
    if (!article) return;
    article.className = `md-card md-tone-${this.tone}`;
    // 更新标题
    let titleEl = article.querySelector('.md-card-title') as HTMLElement | null;
    if (this.title) {
      if (!titleEl) {
        titleEl = document.createElement('h3');
        titleEl.className = 'md-card-title';
        titleEl.style.cssText = 'margin:0 0 4px';
        article.insertBefore(titleEl, article.firstChild);
      }
      titleEl.textContent = this.title;
    } else if (titleEl) {
      titleEl.remove();
    }
    // 更新副标题
    let subEl = article.querySelector('.md-card-subtitle') as HTMLElement | null;
    if (this.subtitle) {
      if (!subEl) {
        subEl = document.createElement('p');
        subEl.className = 'md-card-subtitle';
        subEl.style.cssText = 'margin:0 0 12px;opacity:.85';
        const bodyEl = article.querySelector('.md-card-body');
        if (bodyEl) article.insertBefore(subEl, bodyEl);
        else article.appendChild(subEl);
      }
      subEl.textContent = this.subtitle;
    } else if (subEl) {
      subEl.remove();
    }
  }
}
defineElement('md-card', MdCard);


/** <md-avatar> — 蒙德里安头像 */
export class MdAvatar extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['tone', 'name', 'size', 'src'];
  }

  get name(): string | null { return this.getAttribute('name'); }
  set name(v: string | null) { if (v) this.setAttribute('name', v); else this.removeAttribute('name'); }
  get src(): string | null { return this.getAttribute('src'); }
  set src(v: string | null) { if (v) this.setAttribute('src', v); else this.removeAttribute('src'); }

  override render(): void {
    const size = parseInt(this.getAttribute('size') || '36', 10);
    const initials = getInitials(this.name ?? undefined);
    const fontSize = Math.max(12, Math.floor(size * 0.36));
    const imgHtml = this.src
      ? `<img src="${this.src}" alt="${this.name || 'avatar'}" class="md-avatar-img" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" style="width:100%;height:100%;object-fit:cover" />`
      : '';
    const fallbackHtml = `<span style="display:${this.src ? 'none' : 'block'}">${initials}</span>`;
    this.innerHTML = `<span class="md-avatar md-tone-${this.tone}" style="width:${size}px;height:${size}px;font-size:${fontSize}px;display:inline-flex;align-items:center;justify-content:center;border:2px solid #111;font-weight:700;overflow:hidden">${imgHtml}${fallbackHtml}</span>`;
  }
}
defineElement('md-avatar', MdAvatar);


/** <md-input> — 蒙德里安输入框 */
export class MdInput extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['tone', 'size', 'placeholder', 'error', 'disabled', 'type'];
  }

  get placeholder(): string { return this.getAttribute('placeholder') || ''; }
  set placeholder(v: string) { this.setAttribute('placeholder', v); }
  get type(): string { return this.getAttribute('type') || 'text'; }
  set type(v: string) { this.setAttribute('type', v); }
  get value(): string { return (this.querySelector('input') as HTMLInputElement)?.value || ''; }
  set value(v: string) {
    const input = this.querySelector('input') as HTMLInputElement;
    if (input) input.value = v;
  }

  override render(): void {
    const pH = this.placeholder ? `placeholder="${this.placeholder}"` : '';
    this.innerHTML = `<input class="md-control md-field md-tone-${this.tone} ${this.sizingClass() || ''} ${this.error ? 'md-field-error' : ''}" ${pH} type="${this.type}" ${this.disabled ? 'disabled' : ''} aria-invalid="${this.error}" style="width:100%;padding:${this.pad()[0]} ${this.pad()[1]};background:var(--md-white);color:var(--md-black);appearance:none" />`;
    const input = this.querySelector('input')!;
    input.addEventListener('input', () => this.emit('md-change', { value: input.value }));
  }
}
defineElement('md-input', MdInput);


/** <md-progress> — 蒙德里安进度条 */
export class MdProgress extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['tone', 'value', 'max', 'showvalue'];
  }

  get value(): number { return parseFloat(this.getAttribute('value') || '0'); }
  set value(v: number) { this.setAttribute('value', String(v)); }
  get max(): number { return parseFloat(this.getAttribute('max') || '100'); }
  set max(v: number) { this.setAttribute('max', String(v)); }
  get showvalue(): boolean { return this.getAttribute('showvalue') !== 'false'; }
  set showvalue(v: boolean) { this.setAttribute('showvalue', String(v)); }

  override render(): void {
    const maxVal = this.max <= 0 ? 100 : this.max;
    const safeVal = Math.min(maxVal, Math.max(0, this.value));
    const pct = Math.round((safeVal / maxVal) * 100);
    const label = this.showvalue ? `<span class="md-progress-label" style="font-size:12px;font-weight:700">${pct}%</span>` : '';
    this.innerHTML = `<div class="md-progress-wrap" style="display:grid;gap:4px"><div class="md-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${maxVal}" aria-valuenow="${safeVal}" aria-valuetext="${pct}%" style="width:100%;height:14px;border:2px solid #111;background:var(--md-white)"><div class="md-progress-fill md-tone-${this.tone}" style="width:${pct}%;height:100%"></div></div>${label}</div>`;
  }
}
defineElement('md-progress', MdProgress);


/** <md-switch> — 蒙德里安开关 */
export class MdSwitch extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['tone', 'checked', 'disabled', 'label'];
  }

  get checked(): boolean { return this.hasAttribute('checked'); }
  set checked(v: boolean) { this.toggleAttribute('checked', v); }
  get label(): string | null { return this.getAttribute('label'); }
  set label(v: string | null) { if (v) this.setAttribute('label', v); else this.removeAttribute('label'); }

  override render(): void {
    const on = this.checked;
    const lbl = this.label ? `<span class="md-switch-label" style="font-weight:600;margin-left:8px">${this.label}</span>` : '';
    const toneCls = on ? `md-tone-${this.tone}` : '';
    this.innerHTML = `<div class="md-switch-wrap" style="display:inline-flex;align-items:center;gap:8px"><button type="button" role="switch" aria-checked="${on}" class="md-control md-switch ${toneCls}" ${this.disabled ? 'disabled' : ''} style="width:54px;height:30px;padding:2px;background:${on ? '' : 'var(--md-white)'};display:inline-flex;align-items:center;cursor:pointer"><span class="md-switch-thumb ${on ? 'md-switch-thumb-on' : ''}" aria-hidden="true" style="width:22px;height:22px;background:var(--md-black);transition:transform var(--md-motion-fast) ease;${on ? 'transform:translateX(24px)' : ''}"></span></button>${lbl}</div>`;
    this.querySelector('button')?.addEventListener('click', () => {
      if (!this.disabled) {
        this.checked = !this.checked;
        this.render();
        this.emit('md-change', { checked: this.checked });
      }
    });
  }
}
defineElement('md-switch', MdSwitch);


/** <md-skeleton> — 蒙德里安骨架屏 */
export class MdSkeleton extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['width', 'height', 'circle'];
  }

  get circle(): boolean { return this.hasAttribute('circle'); }
  set circle(v: boolean) { this.toggleAttribute('circle', v); }

  override render(): void {
    const w = this.getAttribute('width') || '100%';
    const h = this.getAttribute('height') || '16';
    const circ = this.circle ? 'md-skeleton-circle' : '';
    this.innerHTML = `<div class="md-skeleton ${circ}" aria-hidden="true" style="width:${w};height:${h}px;border:2px solid #111"></div>`;
  }
}
defineElement('md-skeleton', MdSkeleton);


/** <md-alert> — 蒙德里安提示 */
export class MdAlert extends MondrianElement {
  static override get observedAttributes(): string[] {
    return ['tone', 'title', 'description'];
  }

  get title(): string { return this.getAttribute('title') ?? ''; }
  set title(v: string) { this.setAttribute('title', v); }
  set description(v: string | null) { if (v) this.setAttribute('description', v); else this.removeAttribute('description'); }

  override render(): void {
    if (!this.mounted) {
      const t = this.title ? `<p class="md-alert-title" style="margin:0 0 4px;font-weight:700">${this.title}</p>` : '';
      const d = this.description ? `<p class="md-alert-desc" style="margin:0">${this.description}</p>` : '';
      this.firstRender(
        `<div class="md-alert md-tone-${this.tone}" role="alert" style="padding:12px">${t}${d}<div class="md-alert-body"></div></div>`,
        '.md-alert-body',
      );
      return;
    }
    // 增量更新
    const div = this.querySelector('div[role="alert"]');
    if (!div) return;
    div.className = `md-alert md-tone-${this.tone}`;
    // 更新标题
    let titleEl = div.querySelector('.md-alert-title') as HTMLElement | null;
    if (this.title) {
      if (!titleEl) {
        titleEl = document.createElement('p');
        titleEl.className = 'md-alert-title';
        titleEl.style.cssText = 'margin:0 0 4px;font-weight:700';
        div.insertBefore(titleEl, div.firstChild);
      }
      titleEl.textContent = this.title;
    } else if (titleEl) {
      titleEl.remove();
    }
    // 更新描述
    let descEl = div.querySelector('.md-alert-desc') as HTMLElement | null;
    if (this.description) {
      if (!descEl) {
        descEl = document.createElement('p');
        descEl.className = 'md-alert-desc';
        descEl.style.cssText = 'margin:0';
        const bodyEl = div.querySelector('.md-alert-body');
        if (bodyEl) div.insertBefore(descEl, bodyEl);
        else div.appendChild(descEl);
      }
      descEl.textContent = this.description;
    } else if (descEl) {
      descEl.remove();
    }
  }
}
defineElement('md-alert', MdAlert);


/* ---- helpers ---- */

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
