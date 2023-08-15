import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Districts, Provinces, Sectors, SubDistricts } from '../models/class/province.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  constructor(private readonly http: HttpClient) {}

  login(form: { username: string; password: string }) {
    return this.http.post(
      `${environment.wooUrl}/${environment.postAuthe}`,
      form
    );
  }
  validateToken(token: any) {
    return this.http.post(
      `${environment.wooUrl}/${environment.validateAuthen}`,
      token
    );
  }

  isLogin() {
    let session = localStorage.getItem('session');
    let logedId = JSON.parse(session);
    if(!session){
      return 0
    }
    return (logedId.isLogin != null && logedId.isLogin == 'ok')
  }

  getStatusUser(emails: string) {
    const url = 'http://localhost:3000/users/'
    return this.http.get(url+emails)
  }

  uploadImages(formdata: FormData) {
    return this.http.post(`${environment.baseUrl}/products/uploads` , formdata)
  }

  getSector(): Observable<Sectors[]> {
    return this.http.get<Sectors[]>(`${environment.baseUrl}/province/sector`)
  }
  getProvince(secter_id: number): Observable<Provinces[]> {
    return this.http.get<Provinces[]>(`${environment.baseUrl}/province/provine/${secter_id}`)
  }
  getDistrict(province_id: number):Observable<Districts[]> {
    return this.http.get<Districts[]>(`${environment.baseUrl}/province/ampher/${province_id}`)
  }
  getSubDistrict(district_id: number):Observable<SubDistricts[]> {
    return this.http.get<SubDistricts[]>(`${environment.baseUrl}/province/district/${district_id}`)
  }
  getSubDistrictById(id: number) :Observable<SubDistricts[]> {
    return this.http.get<SubDistricts[]>(`${environment.baseUrl}/province/ampher_id/${id}`)
  }
  getProvinceById(id: number): Observable<Provinces[]> {
    return this.http.get<Provinces[]>(`${environment.baseUrl}/province/province_id/${id}`)
  }
}
