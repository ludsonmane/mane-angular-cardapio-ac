import { Component, OnInit, NgZone } from '@angular/core';
import { IconService } from './shared/services/icon/icon.service';
import { LanguageService } from './shared/services/language/language.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

declare global {
  interface Window {
    MA?: {
      accept?: () => void;
      setUnit?: (slug: string) => void;
      fireNow?: () => void;
      runIfConsented?: () => void;
    };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showMenu = false;
  private prevUrl = '';

  constructor(
    private iconService: IconService,
    private languageService: LanguageService,
    private router: Router,
    private zone: NgZone
  ) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects || e.url; // ex.: "/unidade" -> "/cardapio/slug"
        const was = this.prevUrl;
        this.prevUrl = url;

        // sua lógica do menu (se precisar)
        const routesWithMenu = [
          '/home',
          '/restaurantes/home',
          '/buscar',
          '/favoritos',
          '/opcoes',
          '/menus'
        ];
        this.showMenu = routesWithMenu.includes(url);

        // 1) Se saiu da tela de seleção, concede consent automaticamente
        const cameFromSelection = /^\/(unidade|location-selection|selecionar-unidade)(\/|$)/i.test(was || '');
        const nowIsNotSelection = !/^\/(unidade|location-selection|selecionar-unidade)(\/|$)/i.test(url);
        if (cameFromSelection && nowIsNotSelection) {
          this.zone.runOutsideAngular(() => {
            setTimeout(() => { try { window.MA?.accept?.(); } catch {} }, 0);
          });
        }

        // 2) Se rota é /cardapio/:slug, tenta capturar a unidade (se existir na URL)
        const m = url.match(/^\/cardapio\/([^\/?#]+)/i);
        if (m) {
          const slug = decodeURIComponent(m[1]);
          this.zone.runOutsideAngular(() => {
            setTimeout(() => { try { window.MA?.setUnit?.(slug); } catch {} }, 0);
          });
        }

        // 3) Sempre tenta disparar após navegação (só dispara se já houver consent)
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            try { (window.MA?.fireNow || window.MA?.runIfConsented)?.(); } catch {}
          }, 0);
        });
      });
  }

  ngOnInit(): void {
    this.iconService.registerIcons();
  }
}
