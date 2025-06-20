import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header-actions',
    standalone: false,
    templateUrl: './header-actions.component.html',
    styleUrl: './header-actions.component.css'
})
export class HeaderActionsComponent {
    @Input() showFavorite: boolean = false
    @Input() showShare: boolean = false
    @Input() showInfo: boolean = false
    @Input() showTitle: boolean = false
    @Input() isFavorite?: boolean = false
    @Input() title?: string

    @Output() favorite = new EventEmitter<void>()
    @Output() share = new EventEmitter<void>()
    @Output() info = new EventEmitter<void>()

    constructor(
        private location: Location,
        private router: Router,
        private matSnackbar: MatSnackBar
    ) {}

    onFavorite(): void { this.favorite.emit() }

    onInfo(): void { this.info.emit() }

    onBack(): void {
        if (window.history.length > 1)
            this.location.back()
        else this.router.navigate(['/home'])
    }

    onShare(): void {
        const data = {
            title: this.title,
            originUrl: window.location.origin,
            url: window.location.href
        }

        if (navigator.share) {
            navigator.share(data)
                .then(() => this.showSnackBar('Conteúdo compartilhado!'))
                .catch(() => this.showSnackBar('Erro ao compartilhar!', true))
        } else {
            this.copyLinkFallback(data.url)
        }
    }

    private copyLinkFallback(url: string): void {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url)
                .then(() => this.showSnackBar('Link copiado para a área de transferência!'))
                .catch(() => this.showSnackBar('Erro ao copiar o link.', true))
        }
    }

    private showSnackBar(message: string, isError: boolean = false): void {
        this.matSnackbar.open(message, '', {
            duration: 6000,
            panelClass: isError ? ['snack-error'] : ['snack-success'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        })
    }
}
