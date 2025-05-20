import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-item-card',
    standalone: false,
    templateUrl: './menu-item-card.component.html',
    styleUrl: './menu-item-card.component.css'
})
export class MenuItemCardComponent {
    @Input() id!: number
    @Input() imageUrl!: string
    @Input() title!: string
    @Input() description!: string
    @Input() currentPrice!: number
    @Input() originalPrice?: number
    @Input() isFavorite?: boolean = false

    constructor(private router: Router) {}

    onNavigate(): void {
        // Passar a rota da página menu-item-detail, quando for criada
        this.router.navigate(['', this.id])
    }
}
