import { ProductService } from './../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProductModel } from '../../shared/models/product.model';
import { RestaurantService } from '../../shared/services/restaurant/restaurant.service';
import { RestaurantModel } from '../../shared/models/restaurant.model';

@Component({
    selector: 'app-product',
    standalone: false,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

    product!: ProductModel
    productId!: string
    restaurant!: RestaurantModel

    scrollY: number = 0

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private restaurantService: RestaurantService
    ) {}

    ngOnInit(): void {
        this.productId = this.activatedRoute.snapshot.paramMap.get('id') || ''
        this.getDetailsProduct(this.productId)
    }

    loadDetailsProduct(id: string): void {
        this.productService.getProductById(id)
            .subscribe((response) => {
                if (response) {
                    this.product = response
                    this.loadRestaurant(response.restaurantId)
                }
            })
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
