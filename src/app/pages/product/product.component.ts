import { ProductService } from './../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../shared/services/restaurant/restaurant.service';

@Component({
    selector: 'app-product',
    standalone: false,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

    product!: any
    productId!: string
    restaurant!: any
    listSuggestions: any[] = []

    scrollY: number = 0

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private restaurantService: RestaurantService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            const id = params.get('id')
            if (id) this.loadDetailsProduct(id)
        })
    }

    loadDetailsProduct(id: string): void {
        this.productService.getProductById(id)
            .subscribe((response) => {
                if (response) {
                    this.product = response
                    this.loadRestaurant(response.restaurantId)
                    this.loadFollowUpSuggestions(response.suggestions)
                }
            })
    }

    loadFollowUpSuggestions(items: any): void {
        this.productService.getSuggestedItems()
            .subscribe((response) => this.listSuggestions = response)
    }

    loadRestaurant(id: string): void {
        this.restaurantService.getRestaurantById(id)
            .subscribe((response) => { if (response) this.restaurant = response })
    }

    onContentScroll(event: Event): void {
        const target = event.target as HTMLElement
        this.scrollY = target.scrollTop
    }
}
