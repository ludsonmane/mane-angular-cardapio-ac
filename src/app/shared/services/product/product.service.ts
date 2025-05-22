import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { MenuItemModel } from '../../models/menu-item.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

    getProductById(id: string): Observable<ProductModel | undefined> {
        return this.http.get<ProductModel[]>('data/products.json').pipe(
            map((products) => products.find(item => item.id === id))
        )
    }

    getSuggestedItems(): Observable<MenuItemModel[]> {
        return this.http.get<MenuItemModel[]>('data/suggested-items.json')
    }
}
