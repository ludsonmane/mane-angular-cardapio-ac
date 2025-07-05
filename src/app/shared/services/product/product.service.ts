import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

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
        return this.http.get<any[]>(this.apiBaseUrl + 'products?filters[isSugestion][$eq]=true&filters[isActive][$eq]=true&populate=*', { headers: this.headers })
    }

    getChefTips(): Observable<any[]> {
        return this.http.get<any[]>('data/chef-tips.json')
    }

    getProductByRestaurant(zigBarId?: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + `products?filters[bars][zigBarId][$eq]=${zigBarId}&filters[isActive][$eq]=true&populate=*`, { headers:  this.headers })
    }

    getProductByCategory(category: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + `products?filters[categories][name][$eq]=${category}&filters[isActive][$eq]=true&populate=*`, { headers: this.headers })
    }

    getFavoriteProducts(): Observable<any[]> {
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        let favoritesToFilter = ''
        if (favorites.length > 0) {
            for(let i = 0; i<favorites.length;i++) {
                console.log(favorites[i])
                favoritesToFilter = favoritesToFilter + `filters[documentId][$eq]=${favorites[i]}&`
            }
        }
        return this.http.get<any[]>(this.apiBaseUrl + `products?${favoritesToFilter}populate=*`, { headers: this.headers })
    }
}
