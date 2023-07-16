import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ActiveRouteService implements CanActivate {

  constructor(private readonly router: Router, ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const jwt = localStorage.getItem('jwt')
    if(jwt){
      return true
    }
    else{
      this.router.navigate(['/login'])
      return false
    }
  }

}
