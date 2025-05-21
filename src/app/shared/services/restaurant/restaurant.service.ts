import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantModel } from '../../models/restaurant.model';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    constructor(private http: HttpClient) { }

    getRestaurantById(id: string): Observable<RestaurantModel | undefined> {
        return this.http.get<RestaurantModel[]>('data/restaurants.json').pipe(
            map((restaurants) => restaurants.find(item => item.id === id))
        )
    }

    getAllRestaurants(): Observable<RestaurantModel[]> {
        return this.http.get<RestaurantModel[]>('data/restaurants.json')
    }
}
