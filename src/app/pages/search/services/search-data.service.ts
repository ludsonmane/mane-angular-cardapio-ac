import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryModel } from '../../../shared/models/category.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SearchDataService {

    private apiBaseUrl: string = environment.apiBaseUrl
    token = environment.token
    headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
    })

    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        return this.http.get<any>(this.apiBaseUrl + 'categories', { headers: this.headers })
    }

    getCategoryById(id: string): Observable<any> {
        return this.http.get<any[]>('data/categories.json').pipe(
            map((items) => items.find((item: any) => item.id === id))
        )
    }
}
