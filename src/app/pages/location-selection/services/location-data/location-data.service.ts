import { LocationsModel } from './../../../../shared/models/locations.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocationDataService {

    constructor(private http: HttpClient) { }

    public getLocations(): Observable<LocationsModel[]> {
        return this.http.get<LocationsModel[]>('data/location.json')
    }
}
