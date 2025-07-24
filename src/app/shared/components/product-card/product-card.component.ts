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
    myFavorites: string[] = [];

    constructor(private router: Router) {
        this.loadFavorites();
    }

    loadFavorites(): void {
        this.myFavorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
    }

    onNavigate(): void {
        // Passar a rota da página menu-item-detail, quando for criada
        this.router.navigate(['/produto', this.productData.zigId])
    }

    setFavorite(): void {
        // Recupera favoritos do localStorage
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        console.log(this.productData)
        if (this.productData) {
            const index = favorites.indexOf(this.productData.documentId);
            if (index === -1) {
                favorites.push(this.productData.documentId);
            } else {
                favorites.splice(index, 1);
            }
            localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
            this.myFavorites = favorites
        }
    }
}
