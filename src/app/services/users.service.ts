import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Branch, BranchCreateForUser } from '../models/class/branch.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly http: HttpClient
  ) { }

  createBranchForUser(item: BranchCreateForUser):Observable<Branch> {
    console.log(item);

    return this.http.post<Branch>(`${environment.baseUrl}/users/create/branch`, item)
  }
}
