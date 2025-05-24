import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryModel } from '../../../shared/models/category.model';

@Injectable({
    providedIn: 'root'
})
export class SearchDataService {

    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        return this.http.get<any>('data/categories.json')
    }

    getCategoryById(id: string): Observable<CategoryModel | undefined> {
        return this.http.get<CategoryModel[]>('data/categories.json').pipe(
            map((items) => items.find((item: any) => item.id === id))
        )
    }
}
