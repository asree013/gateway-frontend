import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StockCreate, StockQuantity, StockQuantityRelate, Stocks } from '../models/class/stock.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private readonly http: HttpClient) {}
  create(item: StockCreate): Observable<Stocks> {
    return this.http.post<Stocks>(`${environment.baseUrl}/stock`, item);
  }
  getStockByIdProduct(id: number): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(
      `${environment.baseUrl}/stock/product/${id}`
    );
  }
  getStockById(id: number): Observable<Stocks> {
    return this.http.get<Stocks>(`${environment.baseUrl}/stock/${id}`);
  }
  getStockAll(): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(`${environment.baseUrl}/stock`);
  }
  getStockPagination(pages: number, pageSizes: number): Observable<Stocks[]> {
    const item = {
      page: pages,
      pageSize: pageSizes,
    };
    return this.http.post<Stocks[]>(`${environment.baseUrl}/stock/page`, item);
  }
  deleteStock(id: number) {
    return this.http.delete(`${environment.baseUrl}/stock/${id}`);
  }
  search(key: any): Observable<Stocks[]> {
    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar',
    };
    return this.http.post<Stocks[]>(
      `${environment.baseUrl}/stock/search`,
      key,
      { headers: headers }
    );
  }
  searchStockQuantity(key: any): Observable<StockQuantity[]> {
    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar',
    };
    return this.http.post<StockQuantity[]>(`${environment.baseUrl}/stock-quantity/search`,key,{ headers: headers }
    );
  }
  addStockQuantity(item: StockQuantity) {
    return this.http.post<StockQuantity>(`${environment.baseUrl}/stock-quantity`, item)
  }
  getStockQuantity() {
    return this.http.get<StockQuantity[]>(`${environment.baseUrl}/stock-quantity`)
  }
  getStockQuantityById(id: number) {
    return this.http.get<StockQuantity>(`${environment.baseUrl}/stock-quantity/${id}`)
  }
  getStockQuantityBySku(id: string) {
    return this.http.get<StockQuantity>(`${environment.baseUrl}/stock-quantity/sku/${id}`)
  }
  editStockQuantity(id:number, item: StockQuantity){
    return this.http.put<StockQuantity>(`${environment.baseUrl}/stock-quantity/quantity/${id}`, item)
  }
  deleteStockQuantity(id: number){
    return this.http.delete(`${environment.baseUrl}/stock-quantity/${id}`)
  }
  getStockQuantityAll(): Observable<StockQuantityRelate[]> {
    return this.http.get<StockQuantityRelate[]>(`${environment.baseUrl}/stock-quantity/all`)
  }
  inventoryUpdate(sku: string, item: StockQuantity) {
    console.log('service: ', sku, item);

    return this.http.post<StockQuantity>(`${environment.baseUrl}/stock-quantity/inventory/${sku}`, item)
  }
}
