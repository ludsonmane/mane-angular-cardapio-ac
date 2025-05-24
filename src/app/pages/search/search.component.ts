import { Component, OnInit } from '@angular/core';
import { SearchDataService } from './services/search-data.service';
import { ProductService } from '../../shared/services/product/product.service';
import { ProductModel } from '../../shared/models/product.model';
import { RestaurantModel } from '../../shared/models/restaurant.model';
import { RestaurantService } from '../../shared/services/restaurant/restaurant.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-search',
    standalone: false,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

    search: string = ''
    selectedType: string = 'pratos'

    listCategories: any[] = []
    types: string[] = ['pratos', 'restaurantes']
    listProducts: ProductModel[] = []
    listRestaurants: RestaurantModel[] = []
    filteredProducts: ProductModel[] = []
    filteredRestaurants: RestaurantModel[] = []

    constructor(
        private searchDataService: SearchDataService,
        private productService: ProductService,
        private restaurantService: RestaurantService
    ) {}

    ngOnInit(): void {
        this.loadCategories()
        this.loadAllProducts()
        this.loadAllRestaurants()
    }

    loadCategories(): void {
        this.searchDataService.getCategories()
            .subscribe((response) => this.listCategories = response)
    }

    loadAllProducts(): void {
        this.productService.getProductByRestaurant()
            .subscribe((response) => {
                this.listProducts = response
                this.filteredProducts = response
            })
    }

    loadAllRestaurants(): void {
        this.restaurantService.getAllRestaurants()
            .subscribe((response) => {
                this.listRestaurants = response
                this.filteredRestaurants = response
            })
    }

    cancelSearch(): void {
        this.search = ''
        this.filteredProducts = [...this.listProducts]
        this.filteredRestaurants = [...this.listRestaurants]
    }

    onSearch(): void {
        const term = this.search.toLowerCase().trim() || ''

        this.filteredProducts = this.listProducts
            .filter(product => product.name.toLowerCase().includes(term))

        this.filteredRestaurants = this.listRestaurants
            .filter(restaurant => restaurant.name.toLowerCase().includes(term))
    }

    setType(type: string): void {
        this.selectedType = type
        this.onSearch()
    }

    getCount(type: string): number {
        return type === 'pratos' ? this.filteredProducts.length : this.filteredRestaurants.length
    }
}
