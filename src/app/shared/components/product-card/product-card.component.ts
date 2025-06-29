import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-card',
    standalone: false,
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
    @Input() layout: 'horizontal' | 'vertical' = 'horizontal'

    @Input() id?: string
    @Input() title!: string
    @Input() imageUrl!: string
    @Input() description?: string

    @Input() price!: number // preço original
    @Input() currentPrice?: number // preço atual|desconto
    @Input() isFavorite: boolean = false

    @Input() productData: any

    constructor(private router: Router) {}

    onNavigate(): void {
        // Passar a rota da página menu-item-detail, quando for criada
        this.router.navigate(['/produto', JSON.stringify(this.productData)])
    }

    setFavorite(): void {
        this.isFavorite = !this.isFavorite
    }
}
