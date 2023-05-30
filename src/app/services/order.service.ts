import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../models/interface/woocommerce.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
  ) { }
  getOrderAll(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${environment.baseUrl}/orders`)
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/order/${id}`)
  }
}
