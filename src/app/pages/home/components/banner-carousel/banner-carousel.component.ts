import { Component, OnInit } from '@angular/core';
import { HomeDataService } from '../../services/home-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-banner-carousel',
    standalone: false,
    templateUrl: './banner-carousel.component.html',
    styleUrl: './banner-carousel.component.css'
})
export class BannerCarouselComponent implements OnInit{

    imageList: any[] = []

    constructor(private homeDataService: HomeDataService, private router: Router) {}

    ngOnInit(): void {
        this.homeDataService.getImagesCarousel()
            .subscribe((response: any) => {
                for(let i = 0; i < response.data.length; i++) {
                    if (
                        this.verifyIfHasToBeShown(
                        response.data[i].menu.startDate,
                        response.data[i].menu.endDate,
                        response.data[i].menu.days.map((el: any) => el.numberDay)
                        )
                    ) {
                        this.imageList.push(response.data[i])
                    }
                }
                
                //this.imageList = response.data
            })
    }

    onGoToRestaurant(cardapioId: any): void {
        console.log(cardapioId)
        this.router.navigate(['menus',cardapioId])
    }

    verifyIfHasToBeShown(startDate: any, endDate: any, days: any): boolean {
        const today = new Date();
        const currentMinutes = today.getHours() * 60 + today.getMinutes();
        // Converte "15:00:00" para minutos desde 00:00
        const [startHour, startMinute] = startDate.split(':').map(Number);
        const [endHour, endMinute] = endDate.split(':').map(Number);
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;
        //console.log(startDate, endDate, days, today.getDay(), startMinutes, endMinutes, currentMinutes)
        return (
            days.includes(today.getDay()) &&
            currentMinutes >= startMinutes &&
            currentMinutes <= endMinutes
        ) ? true : false

    }
}
