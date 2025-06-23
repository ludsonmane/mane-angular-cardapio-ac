import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../../../shared/services/restaurant/restaurant.service';
import { DOCUMENT } from '@angular/common';
import { ProductService } from '../../../../shared/services/product/product.service';

@Component({
    selector: 'app-details-restaurant',
    standalone: false,
    templateUrl: './details-restaurant.component.html',
    styleUrl: './details-restaurant.component.css'
})
export class DetailsRestaurantComponent implements OnInit {
    restaurant!: any
    search: string = ''
    selectedCategory: string = 'Tudo'

    listChefTips: any[] = []
    listCategories: string[] = ['Tudo', 'Executivos', 'Sanduíches', 'Entradas']
    listProducts: any[] = []
    filteredProducts: any[] = []

    constructor(
        private activatedRoute: ActivatedRoute,
        private restaurantService: RestaurantService,
        @Inject(DOCUMENT) private document: Document,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            const id = params.get('id')
            if (id) {
                this.loadDetailsRestaurand(id)
                this.loadChefTips()
                this.loadAllProducts()
            }
        })
    }

    loadDetailsRestaurand(id: string): void {
        this.restaurantService.getRestaurantById(id)
            .subscribe((response) => {
                if (response) {
                    this.restaurant = response

                    const theme = response.theme
                    this.document.documentElement.style.setProperty('--header-bg', theme.headerBg)
                    this.document.documentElement.style.setProperty('--color-text', theme.colorText)
                    this.document.documentElement.style.setProperty('--button-bg', theme.buttonBg)
                }
            })
    }

    cancelSearch(): void {
        this.search = ''
        this.loadAllProducts()
    }

    loadChefTips(): void {
        this.productService.getChefTips()
            .subscribe((response) => this.listChefTips = response)
    }

    loadAllProducts(): void {
        this.productService.getProductByRestaurant()
            .subscribe((response) => {
                this.listProducts = response
                this.filterProducts()
            })
    }

    setCategory(category: string): void {
        this.selectedCategory = category
        this.filterProducts()
    }

    filterProducts() {
        this.filteredProducts = this.listProducts.filter(product => {
            const matchesCategory = this.selectedCategory === 'Tudo' ||
                product.category === this.selectedCategory

            const matchesSearch = this.search
                ? product.name.toLowerCase().includes(this.search.toLowerCase())
                : true

            return matchesCategory && matchesSearch
        })
    }
}
