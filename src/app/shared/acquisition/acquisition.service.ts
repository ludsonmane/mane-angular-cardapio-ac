import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AcquisitionService {
  /* ====== CONFIG ====== */
  private META_PIXEL_ID = '1160688802149033';
  private BRAND = 'Mané Mercado';
  private COOKIE_DAYS = 365;

  /* ====== KEYS ====== */
  private K = {
    consent: 'ma_consent_v1',
    visits:  'ma_visit_count_v1',
    first:   'ma_first_seen_v1',
    queue:   'ma_evt_queue_v1',
  } as const;

  /** flags internas */
  private jsLoaded = false;         // fbevents.js carregado (onload)
  private fbInited = false;         // fbq('init') concluído (flag)
  private readyWait?: Promise<void>; // memoize do ensurePixelReady

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  /* ========= PUBLIC API ========= */

  /** Pré-aquecer conexões (use no ngOnInit do App) */
  public prime(): void {
    try {
      const p1 = this.doc.createElement('link'); p1.rel = 'preconnect'; p1.href = 'https://connect.facebook.net';
      const p2 = this.doc.createElement('link'); p2.rel = 'preconnect'; p2.href = 'https://www.facebook.com';
      this.doc.head.appendChild(p1); this.doc.head.appendChild(p2);
      this.d('[prime] preconnect ok');
    } catch {}
  }

  /** Se já houver consentimento salvo, garante pixel e dispara base */
  public async boot(): Promise<void> {
    const consent = this.readKV(this.K.consent);
    if (consent === 'granted') {
      this.d('[boot] consent granted → ensure & init flow');
      try { await this.ensurePixelReady(); } catch (e) { this.d('[boot] ensure error', e); }
      this.initTrackingFlow();
    } else {
      this.d('[boot] no consent, skipping');
    }
  }

  /** Aceite no clique da unidade: salva consent, garante pixel e drena fila */
  public async activateAndFlush(extra?: Record<string, any>): Promise<void> {
    this.saveKV(this.K.consent, 'granted');
    this.d('[activateAndFlush] consent=granted; ensuring pixel...');
    try { await this.ensurePixelReady(); } catch (e) { this.d('[activateAndFlush] ensure error', e); }
    this.initTrackingFlow(extra);
    this.drain(extra);

    // rede de segurança: re-flush 1s depois
    setTimeout(() => {
      this.d('[activateAndFlush] safety re-flush');
      this.drain(extra);
    }, 1000);
  }

  /** Back-compat */
  public acceptAndRun(extra?: Record<string, any>): Promise<void> {
    return this.activateAndFlush(extra);
  }

  public deny(): void {
    this.saveKV(this.K.consent, 'denied');
    this.d('[deny] consent=denied');
  }

  /** Envia agora; se ainda não puder, enfileira */
  public async fireNow(name: string, params?: Record<string, any>): Promise<void> {
    const consent = this.readKV(this.K.consent);
    if (consent !== 'granted') {
      this.d('[fireNow] no consent → enqueue', name, params);
      this.enqueue(name, params);
      return;
    }
    try {
      await this.ensurePixelReady();
      this.d('[fireNow] sending', name, params);
      (window as any).fbq?.('trackCustom', name, params || {});
    } catch (e) {
      this.d('[fireNow] ensure failed → enqueue', name, e);
      this.enqueue(name, params);
    }
  }

  /* ========= CORE FLOW ========= */

  private initTrackingFlow(extra?: Record<string, any>): void {
    this.loadMetaPixel(); // idempotente

    const visits = this.bumpVisitCount();
    const status = visits === 1 ? 'NewCustomer' : 'RecurringCustomer';
    const base = { brand: this.BRAND, customerStatus: status, visitNumber: visits, ...(extra || {}) };

    this.d('[initFlow] PageView + MenuOpen + New/Recurring', base);
    this.track('PageView');
    this.trackCustom('MenuOpen', base);
    if (visits === 1) this.trackCustom('NewCustomer', base);
    else              this.trackCustom('RecurringCustomer', base);
  }

  /* ========= META PIXEL ========= */

  private loadMetaPixel(): void {
    if (typeof window === 'undefined') return;
    const w = window as any;

    // já inicializado?
    if (w.__MA_FB_INIT__ || this.fbInited) return;

    // garantir script único
    let s = this.doc.getElementById('ma-fb-script') as HTMLScriptElement | null;
    if (!s) {
      s = this.doc.createElement('script');
      s.id = 'ma-fb-script';
      s.async = true;
      s.src = 'https://connect.facebook.net/en_US/fbevents.js';
      s.onload = () => { this.jsLoaded = true; this.d('[pixel] fbevents.js onload'); };
      s.onerror = () => { this.d('[pixel] fbevents.js load error'); };
      this.doc.head.appendChild(s);
      this.d('[pixel] script appended');
    }

    // stub (sem injetar script de novo)
    if (!w.fbq) {
      (function (f: any) {
        if (f.fbq) return;
        const n: any = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        f.fbq = n;
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      })(w);
      this.d('[pixel] fbq stubbed');
    }

    // init uma única vez
    try {
      w.fbq('init', this.META_PIXEL_ID);
      w.fbq('track', 'PageView'); // PageView inicial
      w.__MA_FB_INIT__ = true;
      this.fbInited = true;
      this.d('[pixel] fbq init done');
    } catch (e) {
      this.d('[pixel] fbq init error', e);
    }
  }

  /** Espera o fbevents.js onload **e** o init ter sido executado */
  private ensurePixelReady(): Promise<void> {
    if (this.readyWait) return this.readyWait; // memoize
    this.loadMetaPixel();

    this.readyWait = new Promise<void>((resolve, reject) => {
      const start = Date.now();
      const timeoutMs = 8000;
      const tick = () => {
        const ready = this.jsLoaded && (this.fbInited || (window as any).__MA_FB_INIT__ === true);
        if (ready) {
          this.d('[ensure] ready in', Date.now() - start, 'ms');
          resolve(); return;
        }
        if (Date.now() - start > timeoutMs) {
          this.d('[ensure] timeout');
          reject(new Error('fbq not ready'));
          return;
        }
        setTimeout(tick, 50);
      };
      tick();
    });

    return this.readyWait;
  }

  private track(event: string): void {
    (window as any).fbq?.('track', event);
  }
  private trackCustom(name: string, params?: Record<string, any>): void {
    (window as any).fbq?.('trackCustom', name, params || {});
  }

  /* ========= VISITS ========= */

  private bumpVisitCount(): number {
    let visits = Number(this.readKV(this.K.visits) || 0);
    const firstSeen = this.readKV(this.K.first);
    if (!firstSeen) { this.saveKV(this.K.first, String(Date.now())); visits = 1; }
    else { visits = Math.max(1, visits + 1); }
    this.saveKV(this.K.visits, String(visits));
    return visits;
  }

  /* ========= QUEUE ========= */

  private enqueue(name: string, params?: Record<string, any>) {
    const q = (this.getLS(this.K.queue) as any[]) || [];
    q.push({ name, params: params || {}, ts: Date.now() });
    this.setLS(this.K.queue, q);
  }

  private drain(extra?: Record<string, any>) {
    const q = (this.getLS(this.K.queue) as any[]) || [];
    if (!q.length) return;
    this.d('[drain]', q.length, 'events');
    for (const ev of q) this.trackCustom(ev.name, { ...(ev.params || {}), ...(extra || {}) });
    this.setLS(this.K.queue, []);
  }

  /* ========= KV ========= */

  private setCookie(name: string, value: string, days: number) {
    const d = new Date(); d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    const host = this.doc.location.hostname;
    const domain = host.startsWith('www.') ? host.substring(4) : host;
    this.doc.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax;domain=${domain}`;
  }
  private getCookie(name: string): string | null {
    const n = name + '='; const ca = this.doc.cookie.split(';');
    for (let c of ca) { c = c.trim(); if (c.indexOf(n) === 0) return decodeURIComponent(c.substring(n.length)); }
    return null;
  }
  private setLS(k: string, v: any) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  private getLS(k: string): any { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } }
  private saveKV(key: string, val: string) { this.setCookie(key, val, this.COOKIE_DAYS); this.setLS(key, val); }
  private readKV(key: string): string | null {
    const vCookie = this.getCookie(key); if (vCookie !== null) { this.setLS(key, vCookie); return vCookie; }
    const vLS = this.getLS(key); if (vLS !== null) { this.setCookie(key, vLS, this.COOKIE_DAYS); return vLS; }
    return null;
  }

  /* ========= DEBUG ========= */
  private d(...args: any[]) {
    try {
      if (localStorage.getItem('ma_debug') === '1') {
        // eslint-disable-next-line no-console
        console.log('[MA]', ...args);
      }
    } catch {}
  }
}
