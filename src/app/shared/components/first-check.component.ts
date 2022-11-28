import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Routing } from '../constants/common.constant';
import { CookieKey } from '../constants/cookie.key';
import { CookieHelper } from '../helpers/cookie.hepler';

@Component({
  selector: 'first-check',
  template: '',
  styles: []
})
export class FirstCheckComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    const alreadyLoggedIn = CookieHelper.getCookie(`${environment.team}_${CookieKey.LOGGED_IN}`);
    console.log('first-check');

    setTimeout(() => {
      if (alreadyLoggedIn) {
        this.router.navigate([`/${Routing.DASHBOARD.path}`]);
      } else {
        this.router.navigate([`/${Routing.LOGIN.path}`]);
      }
    }, 10);
  }

}
