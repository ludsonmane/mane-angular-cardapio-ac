import { Component, OnInit } from '@angular/core';
import { SearchDataService } from '../../services/search-data.service';
import { ProductService } from '../../../../shared/services/product/product.service';
import { RestaurantService } from '../../../../shared/services/restaurant/restaurant.service';

@Component({
    selector: 'app-search-home',
    standalone: false,
    templateUrl: './search-home.component.html',
    styleUrl: './search-home.component.css'
})
export class SearchHomeComponent implements OnInit {

    search: string = ''
    selectedType: string = 'pratos'

    listCategories: any[] = []
    types: string[] = ['pratos', 'restaurantes']
    listProducts: any[] = []
    listRestaurants: any[] = []
    filteredProducts: any[] = []
    filteredRestaurants: any[] = []

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
