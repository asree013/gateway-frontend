import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ActiveRouteService implements CanActivate {

  constructor(private readonly router: Router, ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const session = localStorage.getItem('session')
    const isLogin = JSON.parse(session)
    if(isLogin.isLogin === 'ok' && isLogin.isLogin !== null){
      return true
    }
    else{
      this.router.navigate(['/login'])
      return false
    }
  }

}
