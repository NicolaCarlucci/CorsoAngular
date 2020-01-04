import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
