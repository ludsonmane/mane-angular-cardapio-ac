import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-menu-item-card',
    standalone: false,
    templateUrl: './menu-item-card.component.html',
    styleUrl: './menu-item-card.component.css'
})
export class MenuItemCardComponent {
    @Input() imageUrl!: string
    @Input() title!: string
    @Input() description!: string
    @Input() currentPrice!: number
    @Input() originalPrice?: number
    @Input() isFavorite: boolean = false
}
