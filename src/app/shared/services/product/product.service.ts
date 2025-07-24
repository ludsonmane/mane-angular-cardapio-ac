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
        return this.http.get<any[]>(this.apiBaseUrl + `products?filters[zigId][$eq]=${id}&populate=*`, { headers: this.headers })
    }

    getSuggestedItems(): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + 'products?filters[isSugestion][$eq]=true&filters[isActive][$eq]=true&populate=*', { headers: this.headers })
    }

    getChefTips(): Observable<any[]> {
        return this.http.get<any[]>('data/chef-tips.json')
    }

    getProductByRestaurant(zigBarId?: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + `products?filters[bars][zigBarId][$eq]=${zigBarId}&filters[isActive][$eq]=true&populate=*&pagination[pageSize]=100`, { headers:  this.headers })
    }

    getProductByCategory(category: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + `products?filters[segmentations][name][$eq]=${category}&filters[isActive][$eq]=true&populate=*&pagination[pageSize]=100`, { headers: this.headers })
    }

    getFavoriteProducts(favoritesToFilter:any): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + `products?${favoritesToFilter}populate=*`, { headers: this.headers })
    }

    getMenus(menuId:any): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + `menus?filters[documentId][$eq]=${menuId}&populate[0]=products.bars&populate[1]=days`, { headers: this.headers })
    }
}
