import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product/product.service';

@Component({
    selector: 'app-favorites',
    standalone: false,
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

    search: string = ''

    listProducts: ProductModel[] = []
    filteredProducts: ProductModel[] = []

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadAllProducts()
    }

    loadAllProducts(): void {
        this.productService.getFavoriteProducts()
            .subscribe((response) => {
                if (response) {
                    this.listProducts = response
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
