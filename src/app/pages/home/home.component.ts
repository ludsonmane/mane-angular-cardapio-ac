import { HomeDataService } from './services/home-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product/product.service';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    locationId: string = ''
    suggestedItems: any[] = []
    promotionItems: any[] = []

    constructor(
        private activatedRoute: ActivatedRoute,
        private homeDataService: HomeDataService,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.locationId = this.activatedRoute.snapshot.paramMap.get('location') || ''

        this.listSuggestedItems()
        this.listPromotionItems()
    }

    listSuggestedItems(): void {
        this.productService.getSuggestedItems()
            .subscribe((response) => this.suggestedItems = response)
    }

    listPromotionItems(): void {
        this.homeDataService.getPromotions()
            .subscribe((responnse) => this.promotionItems = responnse)
    }
}
