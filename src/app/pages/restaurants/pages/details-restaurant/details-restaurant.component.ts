import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
export class DetailsRestaurantComponent implements OnInit, OnDestroy {
    restaurant!: any
    search: string = ''
    selectedCategory: string = 'Tudo'

    listChefTips: any[] = []
    listCategories: any[] = []
    listProducts: any[] = []
    filteredProducts: any[] = []

    constructor(
        private activatedRoute: ActivatedRoute,
        private restaurantService: RestaurantService,
        @Inject(DOCUMENT) private document: Document,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            
            const id = params['id']
            if (id) {
                this.loadDetailsRestaurand(id)
                this.loadChefTips()
                this.loadAllProducts(id)
            }
        })
    }

    ngOnDestroy(): void {
        this.clearInlineTheme()
    }

    loadDetailsRestaurand(id: string): void {
        this.restaurantService.getRestaurantById(id)
            .subscribe((response) => {
                if (response) {
                    this.restaurant = response.data[0]
                    const theme = response.data[0].theme
                    this.document.documentElement.style.setProperty('--header-bg', theme.headerBg)
                    this.document.documentElement.style.setProperty('--color-text', theme.colorText)
                    this.document.documentElement.style.setProperty('--button-bg', theme.buttonBg)
                }
            })
    }

    cancelSearch(): void {
        this.search = ''
        // this.loadAllProducts()
    }

    loadChefTips(): void {
        this.productService.getChefTips()
            .subscribe((response) => this.listChefTips = response)
    }

    loadAllProducts(zigBarId: string): void {
        this.productService.getProductByRestaurant(zigBarId)
            .subscribe((response: any) => {
                this.listProducts = response.data

                const categories = response.data.map((element: any) => element.categories)
                const refinedCategories = ['Tudo']
                for(let i = 0; i < categories.length; i++) {
                    for (let j = 0; j< categories[i].length; j++) {
                        refinedCategories.push(categories[i][j].name)

                    }
                }
                this.listCategories = [... new Set(refinedCategories)]
                this.filterProducts()
            })
    }

    setCategory(category: string): void {
        this.selectedCategory = category
        this.filterProducts()
    }

    filterProducts() {
        this.filteredProducts = this.listProducts.filter(product => {
            const allCategories = product.categories.map((element: any) => element.name)
            const matchesCategory = this.selectedCategory === 'Tudo' ||
                allCategories.includes(this.selectedCategory)

            const matchesSearch = this.search
                ? product.name.toLowerCase().includes(this.search.toLowerCase())
                : true

            return matchesCategory && matchesSearch
        })
    }

    clearInlineTheme(): void {
        this.document.documentElement.style.removeProperty('--header-bg')
        this.document.documentElement.style.removeProperty('--color-text')
        this.document.documentElement.style.removeProperty('--button-bg')
    }
}
