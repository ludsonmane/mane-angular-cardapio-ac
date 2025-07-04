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
        this.productService.getFavoriteProducts()
            .subscribe((response: any) => {
                if (response) {
                    console.log(response)
                    this.listProducts = response.data
                    this.filterProducts()
                }
            })
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
