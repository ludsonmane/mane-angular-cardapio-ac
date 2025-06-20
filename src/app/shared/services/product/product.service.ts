import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

    getProductById(id: string): Observable<any> {
        return this.http.get<any[]>('data/products.json').pipe(
            map((products) => products.find(item => item.id === id))
        )
    }

    getSuggestedItems(): Observable<any[]> {
        return this.http.get<any[]>('data/suggested-items.json')
    }

    getChefTips(): Observable<any[]> {
        return this.http.get<any[]>('data/chef-tips.json')
    }

    getProductByRestaurant(id?: string): Observable<any[]> {
        return this.http.get<any[]>('data/products.json')
    }

    getProductByCategory(categoryId?: string): Observable<any[]> {
        return this.http.get<any[]>('data/products.json')
    }

    getFavoriteProducts(): Observable<any[]> {
        return this.http.get<any[]>('data/products.json').pipe(
            map((products) => products.filter(item => item.isFavorite))
        )
    }
}
