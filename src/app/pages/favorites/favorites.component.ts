import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service';

@Component({
    selector: 'app-favorites',
    standalone: false,
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

    search: string = ''

    listProducts: any[] = []
    filteredProducts: any[] = []

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadAllProducts()
    }

    loadAllProducts(): void {
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        let favoritesToFilter = ''
        console.log(favorites)
        if (favorites.length > 0) {
            for(let i = 0; i<favorites.length;i++) {
                console.log(favorites[i])
                favoritesToFilter = favoritesToFilter + `filters[documentId][$eq]=${favorites[i]}&`
            } 
            this.productService.getFavoriteProducts(favoritesToFilter)
                .subscribe((response: any) => {
                    if (response) {
                        console.log(response)
                        this.listProducts = response.data
                        this.filterProducts()
                    }
                })
        }
    }

    filterProducts() {
        this.filteredProducts = this.listProducts.filter(product => {
            return product.name.toLowerCase().includes(this.search.toLowerCase())
        })
    }

    cancelSearch(): void {
        this.search = ''
        this.loadAllProducts()
    }

}
