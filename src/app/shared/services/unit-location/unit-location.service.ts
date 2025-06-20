import { LocationModel } from '../../models/location.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UnitLocationService {

    constructor(private http: HttpClient) { }

    public getLocations(): Observable<any[]> {
        return this.http.get<any[]>('data/location.json')
    }
}
