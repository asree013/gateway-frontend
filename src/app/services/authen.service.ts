import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private readonly http: HttpClient) { }

  login(form: { username: string, password: string}) {
    return this.http.post(`${environment.wooUrl}/${environment.postAuthe}`, form)
  }
  validateToken(token: any){
    return this.http.post(`${environment.wooUrl}/${environment.validateAuthen}`, token)
  }
}
