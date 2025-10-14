import { Component, OnInit, NgZone, ApplicationRef } from '@angular/core';
import { AcquisitionService } from './shared/acquisition/acquisition.service';
import { IconService } from './shared/services/icon/icon.service';
import { LanguageService } from './shared/services/language/language.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take, first, switchMap } from 'rxjs';
import { SwUpdate, VersionEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showMenu = false;
  private prevUrl = '';

  // ——— Anti-duplicidade de eventos ———
  private lastMenuOpenAt = 0;
  private lastMenuOpenPath = '';

  constructor(
    private iconService: IconService,
    private languageService: LanguageService,
    private router: Router,
    private zone: NgZone,
    private acq: AcquisitionService,
    private appRef: ApplicationRef,
    private sw: SwUpdate
  ) {
    // --- SW: checa e aplica updates automaticamente (evita F5) ---
    if (this.sw.isEnabled) {
      this.appRef.isStable
        .pipe(first(isStable => isStable))
        .pipe(switchMap(() => this.sw.checkForUpdate()))
        .subscribe();

      this.sw.versionUpdates
        .pipe(filter((e: VersionEvent) => e.type === 'VERSION_READY'))
        .subscribe(async () => {
          try { await this.sw.activateUpdate(); } catch {}
          location.reload();
        });
    }

    // --- Disparo garantido no primeiro load (após a primeira NavigationEnd) ---
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), take(1))
      .subscribe(() => {
        if (this.hasConsent()) {
          this.zone.runOutsideAngular(() => {
            this.safeMenuOpen(this.router.url, { firstLoad: true });
          });
        }
      });

    // --- Em cada navegação ---
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects || e.url; // ex.: "/unidade" -> "/cardapio/slug"
        const was = this.prevUrl;
        this.prevUrl = url;

        // Controle da exibição do menu (considera prefixos)
        const startsWithAny = (p: string[]) => p.some(x => url === x || url.startsWith(x + '/'));
        this.showMenu = startsWithAny([
          '/home',
          '/restaurantes',
          '/buscar',
          '/favoritos',
          '/opcoes',
          '/menus'
        ]);

        // 1) Fallback: saiu da tela de seleção e AINDA não tem consent → ativa
        const isSelection = (u: string) => /^\/(unidade|location-selection|selecionar-unidade)(\/|$)/i.test(u || '');
        const cameFromSelection = isSelection(was);
        const nowIsNotSelection = !isSelection(url);
        if (cameFromSelection && nowIsNotSelection && !this.hasConsent()) {
          this.zone.runOutsideAngular(() => {
            try { this.acq.activateAndFlush({ path: url, trigger: 'route-exit-selection' }); } catch {}
          });
        }

        // 2) Se rota é /cardapio/:slug, captura a unidade e persiste
        const m = url.match(/^\/cardapio\/([^\/?#]+)/i);
        if (m) {
          const slug = decodeURIComponent(m[1]);
          try { localStorage.setItem('place_id', slug); } catch {}
        }

        // 3) Evento por navegação (somente se já houver consentimento)
        if (this.hasConsent()) {
          this.zone.runOutsideAngular(() => {
            this.safeMenuOpen(url);
          });
        }
      });
  }

  ngOnInit(): void {
    this.iconService.registerIcons();
    // Pré-aquece conexões e inicia se já houver consent
    this.acq.prime();
    this.acq.boot();
  }

  // ===== util: verifica consentimento (cookie ou localStorage)
  private hasConsent(): boolean {
    try {
      // cookie
      const name = 'ma_consent_v1=';
      const ck = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(name));
      if (ck && ck.substring(name.length) === 'granted') return true;

      // localStorage (espelho)
      const ls = localStorage.getItem('ma_consent_v1');
      if (!ls) return false;
      const v = (() => { try { return JSON.parse(ls); } catch { return ls; } })();
      return v === 'granted';
    } catch { return false; }
  }

  // ===== util: dispara MenuOpen com de-dup simples
  private safeMenuOpen(path: string, extra?: Record<string, any>) {
    const now = Date.now();
    const tooSoon = (now - this.lastMenuOpenAt) < 1500; // 1.5s
    const samePath = this.lastMenuOpenPath === path;

    if (tooSoon && samePath) return; // ignora duplicado imediato
    this.lastMenuOpenAt = now;
    this.lastMenuOpenPath = path;

    try { this.acq.fireNow('MenuOpen', { path, ...extra }); } catch {}
  }
}
