import { Component, Input, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-product-info',
  standalone: false,
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() tags: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  /**
   * - Quebra linhas (\n ou \r\n) -> <br>
   * - Transforma *texto* ou **texto** em <strong>texto</strong>
   */
  formatDescription(desc: string | null | undefined): SafeHtml {
    if (!desc) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }

    let formatted = desc;

    // Quebra de linha
    formatted = formatted.replace(/\r?\n/g, '<br>');

    // Bold para *texto* OU **texto**
    // (\*{1,2}) captura 1 ou 2 asteriscos no início,
    // ([^*\n]+) pega o conteúdo até outro * (sem quebrar linha),
    // \1 garante que fecha com a mesma quantidade de *.
    formatted = formatted.replace(/(\*{1,2})([^*\n]+)\1/g, '<strong>$2</strong>');

    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}
