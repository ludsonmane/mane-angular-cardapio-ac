import { ProductService } from './../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
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

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const data = params['data']

            if (data) {

                this.productService.getProductById(data).subscribe((response: any) => {
                    this.product = response.data[0]
                    this.restaurant = response.data[0].bars[0]
                    this.listSuggestions = response.data[0].suggestions
                    console.log(this.product)
                })
            }
        })
    }
}
