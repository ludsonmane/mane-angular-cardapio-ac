import { HomeDataService } from './services/home-data.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    placeId: string = ''
    suggestedItems: any[] = []
    promotionItems: any[] = []

    constructor(
        private homeDataService: HomeDataService,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.placeId = localStorage.getItem('place_id') || ''

        this.listSuggestedItems()
        this.listPromotionItems()
    }

    listSuggestedItems(): void {
        this.productService.getSuggestedItems()
            .subscribe((response) => this.suggestedItems = response)
    }

    listPromotionItems(): void {
        this.homeDataService.getPromotions()
            .subscribe((response: any) => this.promotionItems = response.data)
    }
}
