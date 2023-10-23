import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PackingCase } from '../models/class/packing-case';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackingCaseService {

  constructor(
    private readonly http: HttpClient
  ) { }

  createPackingCase(item: PackingCase) {
    return this.http.post<PackingCase>(`${environment.baseUrl}/`, item)
  }
}
