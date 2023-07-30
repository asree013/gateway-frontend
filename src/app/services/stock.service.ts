import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StockCreate, Stocks } from '../models/class/stock.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private readonly http: HttpClient) { }
  create(item: StockCreate): Observable<Stocks> {
    return this.http.post<Stocks>(`${environment.baseUrl}/stock`, item)
  }
  getStockByIdProduct(id: number): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(`${environment.baseUrl}/stock/product/${id}`)
  }
  getStockById(id: number): Observable<Stocks> {
    return this.http.get<Stocks>(`${environment.baseUrl}/stock/${id}`)
  }
  getStockAll(): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(`${environment.baseUrl}/stock`)
  }
}
