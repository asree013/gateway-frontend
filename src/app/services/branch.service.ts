import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Branch, CreateWareHouse} from '../models/class/branch.model';
import { Observable } from 'rxjs';
import { Search } from '../models/class/searh.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private readonly http: HttpClient) { }

  getBranch(): Observable<Branch[]>{
    return this.http.get<Branch[]>(`${environment.baseUrl}/branch`);
  }

  createBranch(item: CreateWareHouse):Observable<Branch> {
    return this.http.post<Branch>(`${environment.baseUrl}/branch`, item)
  }

  search(item: Search<any>): Observable<Branch[]> {
    return this.http.post<Branch[]>(`${environment.baseUrl}/branch/search`, item)
  }

  getById(id: number):Observable<Branch> {
    return this.http.get<Branch>(`${environment.baseUrl}/branch/${id}`)
  }

}
