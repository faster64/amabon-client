import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent {

  progress!: number;
  message!: string;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    baseService: BaseService,
    public http: HttpClient,
    public authenticationService: AuthenticationService
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // this.authenticationService.ping().subscribe({
    //   next: () => console.log(1),
    //   error: error => {
    //     if (error.text !== 'pong') {
    //       MessageBox.information(new Message(this, { content: "Okay, open https://103.179.191.139:5002" }, () => {
    //         window.open("https://103.179.191.139:5002")?.focus();
    //       }))
    //     }
    //   }
    // });
  }
}
