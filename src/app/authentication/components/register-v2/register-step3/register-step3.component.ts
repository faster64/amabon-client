import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { BaseRegisterStepComponent } from '../base-step/base-register-step.component';

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.scss']
})
export class RegisterStep3Component extends BaseRegisterStepComponent {

  constructor(
    baseService: BaseService,
    activatedRoute: ActivatedRoute,
    router: Router,
    authenticationService: AuthenticationService,
  ) {
    super(baseService, activatedRoute, router, authenticationService);
  }

}
