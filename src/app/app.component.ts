import { Component, OnInit, NgZone } from '@angular/core';
import { AcquisitionService } from './shared/acquisition/acquisition.service';
import { IconService } from './shared/services/icon/icon.service';
import { LanguageService } from './shared/services/language/language.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

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
    private zone: NgZone,
    private acq: AcquisitionService
  ) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects || e.url; // ex.: "/unidade" -> "/cardapio/slug"
        const was = this.prevUrl;
        this.prevUrl = url;

        // --- Controle da exibição do menu (considera prefixos) ---
        const startsWithAny = (p: string[]) => p.some(x => url === x || url.startsWith(x + '/'));
        this.showMenu = startsWithAny([
          '/home',
          '/restaurantes',
          '/buscar',
          '/favoritos',
          '/opcoes',
          '/menus'
        ]);

        // --- 1) Se saiu da tela de seleção, concede consent automaticamente ---
        const isSelection = (u: string) => /^\/(unidade|location-selection|selecionar-unidade)(\/|$)/i.test(u || '');
        const cameFromSelection = isSelection(was);
        const nowIsNotSelection = !isSelection(url);
        if (cameFromSelection && nowIsNotSelection) {
          // Aceita LGPD e inicia o fluxo (geofence + pixel + eventos)
          this.zone.runOutsideAngular(() => {
            try { this.acq.acceptAndRun(); } catch {}
          });
        }

        // --- 2) Se rota é /cardapio/:slug, captura a unidade e persiste ---
        const m = url.match(/^\/cardapio\/([^\/?#]+)/i);
        if (m) {
          const slug = decodeURIComponent(m[1]);
          try { localStorage.setItem('place_id', slug); } catch {}
        }

        // --- 3) Evento leve por navegação (só registra se já houver consent) ---
        this.zone.runOutsideAngular(() => {
          try { this.acq.fireNow('MenuOpen', { path: url }); } catch {}
        });
      });
  }

  ngOnInit(): void {
    this.iconService.registerIcons();
    // Se já houver consentimento salvo, inicializa o fluxo ao subir o app
    this.acq.boot();
  }
}
