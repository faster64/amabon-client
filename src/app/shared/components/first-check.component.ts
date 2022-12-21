import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/app/authentication/shared/enums/login.enum';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { Routing } from '../constants/common.constant';

@Component({
  selector: 'first-check',
  template: '',
  styles: []
})
export class FirstCheckComponent implements OnInit {

  constructor(public router: Router, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    const status = this.authenticationService.getLoginStatus();
    console.log('first-check', status);

    setTimeout(() => {
      if (environment.app_allows_guests || status === LoginStatus.LoggedIn) {
        this.router.navigate([`/${Routing.DASHBOARD.path}`]);
      } else {
        this.router.navigate([`/${Routing.SALARY_CONVERTER.path}`]);
      }
    }, 10);
  }

}
