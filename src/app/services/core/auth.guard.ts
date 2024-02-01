import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.authService.isLoggedIn()) {
      // console.log("---already logged in--")
      return true
    } else {
      if (localStorage.getItem('token')) {
        // console.log("---loged--")
        this.authService.setLoggedInStatus(true);
        return true;
      } else {
        // console.log("---login page--")
        this.router.navigate(['/auth/login']);
        return false
      }
    }
  }

  canDeactivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // const isLoggedIn = true
    console.log("---deactivate--",this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      return true;
    }
    return false;
  }
}
