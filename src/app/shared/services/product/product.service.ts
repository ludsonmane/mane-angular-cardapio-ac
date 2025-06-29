import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiBaseUrl: string = environment.apiBaseUrl
    token = environment.token
    headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
    })

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

    getProductByRestaurant(zigBarId?: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + `products?filters[bars][zigBarId][$eq]=${zigBarId}&populate=*`, { headers:  this.headers })
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
