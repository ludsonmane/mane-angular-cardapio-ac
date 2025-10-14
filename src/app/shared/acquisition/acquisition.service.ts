import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Coords = { lat: number; lng: number };

@Injectable({ providedIn: 'root' })
export class AcquisitionService {
  /* ====== CONFIG ====== */
  private META_PIXEL_ID = '1160688802149033';       // ← novo ID
  private BRAND = 'Mané Mercado';
  private COOKIE_DAYS = 365;

  /* ====== GEOFENCE (IP only) ====== */
  private GEOFENCE = {
    center: { lat: -15.7833425, lng: -47.9019692 }, // Estádio Mané
    radiusKm: 4,                                    // raio 2 km
    ipTimeoutMs: 3500,
    ipinfoToken: '2fd811bd4356a1',
  };

  /* ====== KEYS ====== */
  private K = {
    consent: 'ma_consent_v1',
    visits:  'ma_visit_count_v1',
    first:   'ma_first_seen_v1',
    ipgeo:   'ma_ip_geo_cache_v1',
  } as const;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  /* ========= PUBLIC API ========= */
  /** Chame no bootstrap do app (se já houver consentimento salvo). */
  boot() {
    const consent = this.readKV(this.K.consent);
    if (consent === 'granted') this.startFlowWithGeofence();
  }

  /** Chame ao escolher a unidade — isso equivale ao aceite LGPD. */
  acceptAndRun() {
    this.saveKV(this.K.consent, 'granted');
    this.startFlowWithGeofence();
  }

  /** Opcional: negar explicitamente (não rodar tracking). */
  deny() {
    this.saveKV(this.K.consent, 'denied');
  }

  /** Disparo manual de eventos customizados, se precisar. */
  fireNow(name: string, params?: Record<string, any>) {
    this.loadMetaPixel();
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', name, params || {});
    }
  }

  /* ========= CORE FLOW ========= */
  private async startFlowWithGeofence() {
    // cache de ip-geo por 10 minutos
    const cached = this.getLS(this.K.ipgeo) as any;
    if (cached && isFinite(cached.lat) && isFinite(cached.lng) && cached.ts && (Date.now() - cached.ts) < 10 * 60 * 1000) {
      const d = this.distKm({ lat: cached.lat, lng: cached.lng }, this.GEOFENCE.center);
      if (d <= this.GEOFENCE.radiusKm) return this.initTrackingFlow({ geofenceMode: 'ip-cache', geofenceDistanceKm: +d.toFixed(3) });
      return;
    }

    const ip = await this.tryIpProviders();
    if (!ip) return;

    this.setLS(this.K.ipgeo, { lat: ip.lat, lng: ip.lng, ts: Date.now() });
    const d = this.distKm({ lat: ip.lat, lng: ip.lng }, this.GEOFENCE.center);

    if (d <= this.GEOFENCE.radiusKm) {
      return this.initTrackingFlow({ geofenceMode: 'ip', geofenceSource: ip.source, geofenceDistanceKm: +d.toFixed(3) });
    }
    // fora do raio → não dispara
  }

  private initTrackingFlow(extraParams?: Record<string, any>) {
    const visits = this.bumpVisitCount();
    const status = visits === 1 ? 'NewCustomer' : 'RecurringCustomer';

    this.loadMetaPixel();

    const base = Object.assign(
      { brand: this.BRAND, customerStatus: status, visitNumber: visits },
      extraParams || {}
    );

    // Eventos
    this.track('PageView'); // para garantir PageView
    this.trackCustom('MenuOpen', base);
    if (visits === 1) this.trackCustom('NewCustomer', base);
    else              this.trackCustom('RecurringCustomer', base);
  }

  /* ========= META PIXEL ========= */
  private loadMetaPixel() {
    if (typeof window === 'undefined') return;
    if (!this.META_PIXEL_ID || window.__MA_FB_INIT__) return;

    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, this.doc, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq!('init', this.META_PIXEL_ID);
    window.fbq!('track', 'PageView');
    window.__MA_FB_INIT__ = true;
  }

  private track(event: string) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event);
    }
  }
  private trackCustom(name: string, params?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', name, params || {});
    }
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

  /* ========= IP GEO ========= */
  private async tryIpProviders(): Promise<{ lat: number; lng: number; source: string } | null> {
    const urls = [
      `https://ipinfo.io/json?token=${encodeURIComponent(this.GEOFENCE.ipinfoToken)}`,
      'https://ipapi.co/json/',
      'https://ipwho.is/',
      'https://get.geojs.io/v1/ip/geo.json',
    ];
    for (const url of urls) {
      try {
        const r = await this.fetchWithTimeout(url, this.GEOFENCE.ipTimeoutMs);
        if (!r.ok) continue;
        const j = await r.json();
        const p = this.parseIpJson(j);
        if (p) return { ...p, source: new URL(url).hostname };
      } catch { /* ignore */ }
    }
    return null;
  }

  private parseIpJson(j: any): Coords | null {
    let lat = j?.latitude ?? j?.lat;
    let lng = j?.longitude ?? j?.lon ?? j?.lng;
    if ((!lat || !lng) && j?.loc && typeof j.loc === 'string') {
      const [a, b] = j.loc.split(',');
      lat = parseFloat(a); lng = parseFloat(b);
    }
    if (typeof lat === 'string') lat = parseFloat(lat);
    if (typeof lng === 'string') lng = parseFloat(lng);
    if (!isFinite(lat) || !isFinite(lng)) return null;
    return { lat, lng };
  }

  private fetchWithTimeout(url: string, ms: number) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(t));
  }

  private distKm(a: Coords, b: Coords): number {
    const toRad = (x: number) => x * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  /* ========= KV (cookie + LS espelhados) ========= */
  private setCookie(name: string, value: string, days: number) {
    const d = new Date(); d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    const host = this.doc.location.hostname;
    const domain = host.startsWith('www.') ? host.substring(4) : host; // *.mane.com.vc
    this.doc.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax;domain=${domain}`;
  }
  private getCookie(name: string): string | null {
    const n = name + '=';
    const ca = this.doc.cookie.split(';');
    for (let c of ca) {
      c = c.trim();
      if (c.indexOf(n) === 0) return decodeURIComponent(c.substring(n.length));
    }
    return null;
  }
  private setLS(k: string, v: any) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } }
  private getLS(k: string): any { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } }
  private saveKV(key: string, val: string) { this.setCookie(key, val, this.COOKIE_DAYS); this.setLS(key, val); }
  private readKV(key: string): string | null {
    const vCookie = this.getCookie(key);
    if (vCookie !== null) { this.setLS(key, vCookie); return vCookie; }
    const vLS = this.getLS(key);
    if (vLS !== null) { this.setCookie(key, vLS, this.COOKIE_DAYS); return vLS; }
    return null;
  }
}
