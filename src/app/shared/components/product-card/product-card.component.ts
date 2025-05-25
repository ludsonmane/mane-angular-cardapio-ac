import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-card',
    standalone: false,
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
    @Input() id!: string
    @Input() imageUrl!: string
    @Input() title!: string
    @Input() description?: string
    @Input() currentPrice!: number
    @Input() originalPrice?: number
    @Input() isFavorite?: boolean = false
    @Input() layout: 'horizontal' | 'vertical' = 'horizontal'

    constructor(private router: Router) {}

    onNavigate(): void {
        // Passar a rota da página menu-item-detail, quando for criada
        this.router.navigate(['/produto', this.id])
    }

    setFavorite(): void {
        this.isFavorite = !this.isFavorite
    }
}
