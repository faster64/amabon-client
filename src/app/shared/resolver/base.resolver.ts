import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { from, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { delay, switchMap } from "rxjs/operators";
import { AuthenticationService } from "src/app/authentication/shared/services/authentication.service";
import { Routing } from "../constants/common.constant";
import { Utility } from "../utils/utility";

@Injectable({
  providedIn: 'root'
})
export class BaseResolver<T> implements Resolve<T> {

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T | any {
    Utility.changeTitle(route.data["title"] || "F8");
    return of('aws').pipe(delay(300));
  }
}
