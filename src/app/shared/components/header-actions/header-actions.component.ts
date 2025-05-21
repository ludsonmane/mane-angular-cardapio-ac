import { Component, EventEmitter, Input, Output } from '@angular/core';

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
    @Input() isFavorite?: boolean = false

    @Output() back = new EventEmitter<void>()
    @Output() favorite = new EventEmitter<void>()
    @Output() share = new EventEmitter<void>()
    @Output() info = new EventEmitter<void>()

    onBack(): void { this.back.emit() }

    onFavorite(): void { this.favorite.emit() }

    onShare(): void { this.share.emit() }

    onInfo(): void { this.info.emit() }
}
