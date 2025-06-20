import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeDataService {

    constructor(private http: HttpClient) { }

    getImagesCarousel(): Observable<any[]> {
        return this.http.get<any[]>('data/carousel.json')
    }

    getPromotions(): Observable<any[]> {
        return this.http.get<any[]>('data/promotions.json')
    }
}
