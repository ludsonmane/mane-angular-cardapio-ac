import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BarCategoryService {
  private apiBaseUrl: string = environment.apiBaseUrl;
  private token = environment.token;

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  /**
   * Busca as categorias de um bar usando o ID interno do Strapi (bar.id)
   */
  getByBarId(barId: string): Observable<any> {
    const url =
      this.apiBaseUrl +
      'bar-categories' +
      `?filters[bar][id][$eq]=${barId}` +
      '&populate[category]=*' +
      '&sort=order';

    return this.http.get<any>(url, { headers: this.headers });
  }
}
