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

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const data = params['data']
            if (data) {
                const parseData = JSON.parse(data)
                this.product = parseData
                this.restaurant = parseData.bars[0]
                this.listSuggestions = parseData.suggestions
            }
        })
    }
}
