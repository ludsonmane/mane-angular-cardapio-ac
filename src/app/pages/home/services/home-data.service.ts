import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BannerCarouselModel } from '../models/banner-carousel.model';

@Injectable({
    providedIn: 'root'
})
export class HomeDataService {

    constructor(private http: HttpClient) { }

    getImagesCarousel(): Observable<BannerCarouselModel[]> {
        return this.http.get<BannerCarouselModel[]>('data/carousel.json')
    }
}
