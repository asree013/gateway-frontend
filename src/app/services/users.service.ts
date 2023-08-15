import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchForUser, BranchCreateForUser } from '../models/class/branch.model';
import { Observable } from 'rxjs';
import { Customers, CustomersFormCreate } from '../models/interface/woocommerce.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly http: HttpClient
  ) { }

  createBranchForUser(item: BranchCreateForUser):Observable<BranchForUser> {
    return this.http.post<BranchForUser>(`${environment.baseUrl}/users/create/branch`, item)
  }

  findBrandUser(user_id: number):Observable<BranchForUser[]> {
    return this.http.get<BranchForUser[]>(`${environment.baseUrl}/users/branch/${user_id}`)
  }
  createCustomer(item: CustomersFormCreate):Observable<Customers> {
    return this.http.post<Customers>(`${environment.baseUrl}/customers`, item)
  }
}
