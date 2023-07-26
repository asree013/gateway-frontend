import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private readonly http: HttpClient) { }

  getBranch() {
    return this.http.get(`${environment.baseUrl}/branch`);
  }
}
