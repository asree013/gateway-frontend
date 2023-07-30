import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Branch, BranchCreate, BranchCreateForUser } from '../models/class/branch.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private readonly http: HttpClient) { }

  getBranch(): Observable<Branch>{
    return this.http.get<Branch>(`${environment.baseUrl}/branch`);
  }

  createBranch(item: BranchCreate) {
    return this.http.post(`${environment.baseUrl}/branch`, item)
  }

}
