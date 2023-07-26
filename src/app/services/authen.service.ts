import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  constructor(private readonly http: HttpClient) {}

  login(form: { username: string; password: string }) {
    return this.http.post(
      `${environment.wooUrl}/${environment.postAuthe}`,
      form
    );
  }
  validateToken(token: any) {
    return this.http.post(
      `${environment.wooUrl}/${environment.validateAuthen}`,
      token
    );
  }

  isLogin() {
    let session = localStorage.getItem('session');
    let logedId = JSON.parse(session);
    if(!session){
      return 0
    }
    return (logedId.isLogin != null && logedId.isLogin == 'ok')
  }

  getStatusUser(emails: string) {
    const url = 'http://localhost:3000/users/'
    return this.http.get(url+emails)
  }

  uploadImages(formdata: FormData) {
    return this.http.post(`${environment.baseUrl}/products/uploads` , formdata)
  }
}
