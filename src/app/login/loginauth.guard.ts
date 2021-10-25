import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginauthGuard implements CanActivate {
  Loginstatus:boolean= false;
  constructor(private loginService: LoginService) {
    this.loginService.loginStatus.subscribe((status=>{
      this.Loginstatus=status;

    }))
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.Loginstatus;
  }

}
