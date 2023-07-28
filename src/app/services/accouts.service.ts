import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Accout,
  AccoutAll,
  AccoutCreate,
  AccoutOnDate,
  AccoutOnDateAndBranch,
  ImagesCreate,
} from '../models/class/accout.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccoutsService {
  constructor(private http: HttpClient) {}

  getAccouts(): Observable<Accout[]> {
    return this.http.get<Accout[]>(`${environment.baseUrl}/accouts`);
  }
  getAccoutAll(): Observable<AccoutAll[]> {
    return this.http.get<AccoutAll[]>(`${environment.baseUrl}/accouts/all`);
  }
  addAccout(item: AccoutCreate): Observable<AccoutCreate> {
    return this.http.post<AccoutCreate>(`${environment.baseUrl}/accouts`, item);
  }
  addImagesAccout(id:number, item: any) {
    const data = {
      accout_id: id,
      image: item
    }
    console.log(data);

    return this.http.post(`${environment.baseUrl}/accouts/images`, data);
  }
  getImageByAccoutId(id: number) {
    return this.http.get(`${environment.baseUrl}/accouts/images/accout/${id}`)
  }
  deleteAccout(id: number) {
    return this.http.delete(`${environment.baseUrl}/accouts/${id}`)
  }
  getAccoutsOnDateAndBranch(item: AccoutOnDateAndBranch) {
    return this.http.post(`${environment.baseUrl}/accouts/dateandbranch`, item)
  }
  getAccoutsOnDate() {
    return this.http.get(`${environment.baseUrl}/accouts/ondate`)
  }
}
