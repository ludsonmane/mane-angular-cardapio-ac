import { Component, OnInit } from '@angular/core';
import { HomeDataService } from '../../services/home-data.service';

@Component({
    selector: 'app-banner-carousel',
    standalone: false,
    templateUrl: './banner-carousel.component.html',
    styleUrl: './banner-carousel.component.css'
})
export class BannerCarouselComponent implements OnInit{

    imageList: any[] = []

    constructor(private homeDataService: HomeDataService) {}

    ngOnInit(): void {
        this.homeDataService.getImagesCarousel()
            .subscribe((response: any) => this.imageList = response.data)
    }

    onGoToRestaurant(cardapioId: any): void {
        console.log(cardapioId)
        //this.router.navigate([`/restaurantes/${this.id}`])
    }
}
