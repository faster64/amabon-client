import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { from, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { delay, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/auth/shared/services/auth.service";
import { Utility } from "../utils/utility";
import { BaseResolver } from "./base.resolver";

@Injectable({
  providedIn: 'root'
})
export class ViewResolver<T> extends BaseResolver<T> {

  constructor(
    router: Router,
    authService: AuthService,
  ) {
    super(router, authService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T | any {
    return super.resolve(route, state);
  }
}
