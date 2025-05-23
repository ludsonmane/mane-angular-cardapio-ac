import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RestaurantModel } from '../../shared/models/restaurant.model';
import { RestaurantService } from '../../shared/services/restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-details-restaurant',
    standalone: false,
    templateUrl: './details-restaurant.component.html',
    styleUrl: './details-restaurant.component.css'
})
export class DetailsRestaurantComponent implements OnInit{
    restaurant!: RestaurantModel
    search: string = ''

    constructor(
        private activatedRoute: ActivatedRoute,
        private restaurantService: RestaurantService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            const id = params.get('id')
            if (id) this.loadDetailsRestaurand(id)
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

    searchRestaurant(): void {}

    cancelSearch(): void {}
}
