import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Products } from '../models/interface/woocommerce.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProductAll() :Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.baseUrl}/products`)
  }
  getProductOne(id: number): Observable<Products> {
    return this.http.get<Products>(`${environment.baseUrl}/products/${id}`)
  }
  deleteProduct(id: number) {
    return this.http.delete<any>(`${environment.baseUrl}/products/${id}`)
  }
  addProduct(value: Products): Observable<Products>{
    return this.http.post<Products>(`${environment.baseUrl}/products`, value)
  }
}
