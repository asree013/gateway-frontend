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
  getOneOrder(id: number): Observable<Orders> {
    return this.http.get<Orders>(`${environment.baseUrl}/orders/${id}`)
  }
  addOrder(item: Orders): Observable<Orders> {
    console.log(item);

    return this.http.post<Orders>(`${environment.baseUrl}/orders`, item)
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/orders/${id}`)
  }
  updateOrder(item: Orders) {
    return this.http.put<Orders>(`${environment.baseUrl}/orders/${item.id}`, item)
  }
}
