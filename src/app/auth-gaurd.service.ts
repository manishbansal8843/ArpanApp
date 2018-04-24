import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot ,CanActivateChild,CanActivate} from '@angular/router';

@Injectable()
export class AuthGaurdService implements CanActivate, CanActivateChild{

  constructor(private authService:AuthService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called'+this.authService.getLoginStatus());
    this.authService.redirectUrl = state.url;
    if(this.authService.getLoginStatus()){
      console.log('person already logged in');
      return true;
    }
    this.router.navigate(['/login']) ;
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
