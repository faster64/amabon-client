import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginStatus } from 'src/app/authentication/shared/enums/login.enum';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { Routing } from '../constants/common.constant';
import { UserHelper } from '../helpers/user.helper';

@Injectable({
  providedIn: 'root' // you can change to any level if needed
})
export class AdminGuard implements CanActivate {

  constructor(public router: Router, public authenticationService: AuthenticationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (UserHelper.USER_ROLES.findIndex(role => role == "root" || role == "admin") === - 1) {
      this.router.navigate([`${Routing.ACCESS_DENIED.path}`]);
      return false;
    }
    return true;
  }


}
