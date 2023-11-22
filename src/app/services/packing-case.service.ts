import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PackingCase, PackingCaseDetail } from '../models/class/packing-case';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackingCaseService {

  constructor(
    private readonly http: HttpClient
  ) { }

  createPackingCase(item: PackingCase): Observable<PackingCase> {
    return this.http.post<PackingCase>(`${environment.baseUrl}/paking-case`, item)
  }
  createPackingCaseDetail(item: PackingCaseDetail) {
    return this.http.post<PackingCaseDetail>(`${environment.baseUrl}/paking-case/detail`, item)
  }
}
