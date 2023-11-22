import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchForUser, BranchCreateForUser, WarehouseUser, Warehouse } from '../models/class/branch.model';
import { Observable } from 'rxjs';
import { Customers, CustomersFormCreate } from '../models/interface/woocommerce.model';
import { Username, Users } from '../models/class/users.model';

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
  findBranchByBranchId(branch_id: number): Observable<WarehouseUser[]> {
    return this.http.get<WarehouseUser[]>(`${environment.baseUrl}/users/branch/for/${branch_id}`)
  }
  findUserById(id: number):Observable<{user_nicename: string}> {
    return this.http.get<{user_nicename: string}>(`${environment.baseUrl}/users/username/${id}`)
  }
  findBillingByUser_id(id: number):Observable<Customers> {
    return this.http.get<Customers>(`${environment.baseUrl}/customers/${id}`)
  }
  findUserByEmial(email: string): Observable<Users[]> {
    return this.http.get<Users[]>(`${environment.baseUrl}/users/search/${email}`)
  }
  deleteUserBranch(branch_id: number){
    return this.http.delete(`${environment.baseUrl}/users/warehouse/${branch_id}`)
  }
  updateRoleWarehouse(item: BranchCreateForUser) {
    return this.http.put<Warehouse>(`${environment.baseUrl}/users/warehouse/${item.branch_id}/user/${item.user_id}`, item)
  }
  findWarehouseByUser_idAndBranch_id(item: BranchCreateForUser) {
    return this.http.get<Warehouse>(`${environment.baseUrl}/users/warehouse/${item.branch_id}/user/${item.user_id}`,)
  }
  findUsername(username: string) {
    return this.http.get(`${environment.baseUrl}/users/user-login/${username}`)
  }
  findEmail(email: string) {
    return this.http.get(`${environment.baseUrl}/users/user-emali/${email}`)
  }
}
