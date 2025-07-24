import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeDataService {

    private apiBaseUrl: string = environment.apiBaseUrl
    token = environment.token
    headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
    })

    constructor(private http: HttpClient) { }

    getImagesCarousel(): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + 'banners?populate[0]=menu&populate[1]=menu.days&populate[2]=path', { headers: this.headers })
    }

    getPromotions(): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + 'products?filters[isPromotion][$eq]=true&populate=*', { headers: this.headers })
    }
}
