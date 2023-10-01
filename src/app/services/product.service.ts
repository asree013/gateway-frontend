import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Images, Products } from '../models/interface/woocommerce.model';
import { Observable } from 'rxjs';
import { Search } from '../models/class/searh.model';
import { Stocks } from '../models/class/stock.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProductAll() :Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.baseUrl}/products`)
  }
  getProductAllPaginate(page: number) :Observable<Products[]> {
    return this.http.post<Products[]>(`${environment.baseUrl}/products/page`, page)
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
  addProducts(value: Products[]): Observable<Products[]> {
    return this.http.post<Products[]>(`${environment.baseUrl}/products/batch`, value)
  }
  search(item: any): Observable<Products[]> {
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this.http.post<Products[]>(`${environment.baseUrl}/products/search`, item, {headers: headers})
  }
  uploadImage(image: FormData, id: number):Observable<string> {
    return this.http.post<string>(`${environment.baseUrl}/products/upload/${id}`, image)
  }
  addImageInWrodpress(file: FormData, bearer: string) {
    console.log({
      file: file,
      bearer: bearer
    });
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + bearer
    });
    return this.http.post(`${environment.wooUrl}/${environment.upLoadImage}`, file, { headers })
  }
  getDetailStock(id: number): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(`${environment.baseUrl}/stock/product/detail/${id}`)
  }
  uploadImageProduct(file: FormData) {
    return this.http.post(`${environment.baseUrl}/products/upload/image`, file)
  }
  editProduct(idProduct: number ,item: Products) {
    return this.http.put<Products>(`${environment.baseUrl}/products/${idProduct}`, item)
  }
}
