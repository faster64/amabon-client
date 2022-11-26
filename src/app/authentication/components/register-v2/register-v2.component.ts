import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { RegisterStep } from '../../shared/enums/register-step.enum';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CreateAccountRequest } from './base-step/base-register-step.component';

@Component({
  selector: 'app-register-v2',
  templateUrl: './register-v2.component.html',
  styleUrls: ['./register-v2.component.scss']
})
export class RegisterV2Component extends BaseComponent {

  RegisterStep = RegisterStep;

  Routing = Routing;

  currentStep = RegisterStep.RequiredInformation;

  currentInfo = new CreateAccountRequest();

  @ViewChild("nextBtn") nextBtn!: SwtButton;

  constructor(
    baseService: BaseService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public authenticationService: AuthenticationService,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData(): void {
    this.currentStep = this.activatedRoute.snapshot.data["step"];
  }

  next() {
    this.authenticationService.register(this.currentInfo).subscribe(response => {
      this.nextBtn.isFinished = true;
      if (response.success) {
        if (!response.step.isCompleted) {
          this.currentStep = response.step.currentStep;
          this.router.navigateByUrl(`/${Routing.REGISTER.path}/step${this.currentStep}?refId=${response.step.refId}`);
        } else {
          this.router.navigate([`/${Routing.REGISTER.path}/completed`]);
        }
      } else {
        MessageBox.information(new Message(this, { content: response.message }));
      }
    })
  }
}
