import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Output() back = new EventEmitter<void>()
    @Output() favorite = new EventEmitter<void>()
    @Output() share = new EventEmitter<void>()
    @Output() info = new EventEmitter<void>()

    constructor(
        private location: Location,
        private router: Router
    ) {}

    onBack(): void {
        if (window.history.length > 1)
            this.location.back()
        else this.router.navigate(['/home'])
    }

    onFavorite(): void { this.favorite.emit() }

    onShare(): void { this.share.emit() }

    onInfo(): void { this.info.emit() }
}
