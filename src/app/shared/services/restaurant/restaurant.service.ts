import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantModel } from '../../models/restaurant.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    private apiBaseUrl: string = environment.apiBaseUrl
    token = environment.token
    headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
    })

    constructor(private http: HttpClient) { }

    getRestaurantById(id: string): Observable<any> {
        return this.http.get<any[]>(this.apiBaseUrl + `bars?filters[zigBarId][$eq]=${id}`, { headers: this.headers })
    }

    getAllRestaurants(): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + 'bars?fields[0]=zigBarId&fields[1]=name&fields[2]=imageLogoUrl', { headers: this.headers })
    }
}
