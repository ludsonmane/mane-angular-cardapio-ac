import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchDataService {

    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        return this.http.get<any>('data/categories.json')
    }
}
