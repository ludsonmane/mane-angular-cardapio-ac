import { LocationModel } from '../../models/location.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UnitLocationService {

    private apiBaseUrl: string = environment.apiBaseUrl
    token = environment.token
    headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
    })

    constructor(private http: HttpClient) { }

    public getLocations(): Observable<any[]> {
        return this.http.get<any[]>(this.apiBaseUrl + 'locations', { headers: this.headers })
    }
}
