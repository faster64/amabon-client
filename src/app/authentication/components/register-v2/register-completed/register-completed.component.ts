import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'app-register-completed',
  templateUrl: './register-completed.component.html',
  styleUrls: ['./register-completed.component.scss']
})
export class RegisterCompletedComponent extends BaseComponent {

  constructor(
    baseService: BaseService,
    public router: Router,
  ) {
    super(baseService);
  }

  redirectLogin() {
    this.router.navigate([`/${this.Routing.LOGIN.path}`]);
  }

}
