import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { UnitLocationBottomSheetComponent } from '../../shared/components/unit-location-bottom-sheet/unit-location-bottom-sheet.component';
import { AcquisitionService } from '../../shared/acquisition/acquisition.service';

@Component({
  selector: 'app-location-selection',
  standalone: false,
  templateUrl: './location-selection.component.html',
  styleUrl: './location-selection.component.css',
})
export class LocationSelectionComponent implements OnInit {
  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private zone: NgZone,
    private acq: AcquisitionService
  ) {}

  ngOnInit(): void {
    const ref: MatBottomSheetRef<UnitLocationBottomSheetComponent, string | undefined> =
      this.matBottomSheet.open(UnitLocationBottomSheetComponent, {
        hasBackdrop: false,
      });

    // aviso mini (sem tocar no HTML do sheet)
    ref.afterOpened().subscribe(() => this.injectConsentNote());

    // recebe o slug escolhido via dismiss(slug)
    ref.afterDismissed().subscribe((slug) => {
      if (!slug) return;
      this.acceptAndGo(slug);
    });
  }

  /**
   * Clique = aceite LGPD + seta unidade + navegação
   * Eventos (PageView/MenuOpen/New/Recurring) serão disparados pelo AcquisitionService
   */
  private acceptAndGo(slug: string) {
    try { localStorage.setItem('place_id', slug); } catch {}

    // aceita LGPD e inicia fluxo (geofence + pixel + eventos)
    this.zone.runOutsideAngular(() => {
      try { this.acq.acceptAndRun(); } catch {}
    });

    // navega para o cardápio da unidade
    this.router.navigate(['/cardapio', slug]);
  }

  /** Injeta o texto mini "Ao tocar na unidade..." no rodapé do Bottom Sheet */
  private injectConsentNote() {
    this.zone.runOutsideAngular(() => {
      const host = document.querySelector('.mat-bottom-sheet-container');
      if (!host || host.querySelector('.ma-consent-note')) return;

      const p = document.createElement('p');
      p.className = 'ma-consent-note';
      p.innerHTML =
        'Ao tocar na unidade, você aceita a LGPD, o uso de cookies e o tratamento de dados para personalização e conversões. ' +
        '<a href="https://cardapio.mane.com.vc/privacy-policy/" target="_blank" rel="noopener">Saiba mais</a>.';
      host.appendChild(p);

      if (!document.getElementById('ma-consent-note-style')) {
        const style = document.createElement('style');
        style.id = 'ma-consent-note-style';
        style.textContent = `
          .ma-consent-note{
            margin: 6px 0 0;
            font-size: 10px;
            line-height: 1.15;
            color: #9aa0a6;
            letter-spacing: .1px;
          }
          .ma-consent-note a{ color: inherit; text-decoration: underline; }
        `;
        document.head.appendChild(style);
      }
    });
  }
}
