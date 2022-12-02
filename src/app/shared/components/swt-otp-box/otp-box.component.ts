import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgOtpInputComponent } from 'ng-otp-input';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { Message } from 'src/app/shared/models/message/message';
import { TransferDataService } from 'src/app/shared/services/transfer/transfer-data.service';
import { VerifyOtpResult } from '../../../authentication/shared/models/responses/verify-otp-result';


@Component({
  selector: 'otp-box',
  templateUrl: './otp-box.component.html',
  styleUrls: ['./otp-box.component.scss']
})
export class OtpBoxComponent implements OnInit {
  private _length: number = 6;
  private _verifyTextDefault = "Gửi";
  private _verifyingTextDefault = "Đang gửi...";

  @Input()
  verifyText = this._verifyTextDefault;

  @Input()
  verifyingText = this._verifyingTextDefault;

  @Input()
  get length(): number {
    return this._length;
  }

  set length(value: number) {
    if (value < 6 || value > 16) {
      this._length = 6;
      throw Error("OTP's length must greater than or equal to 6 and less than or equal to 16");
    }
    this._length = value;
  }

  @Input()
  allowNumbersOnly = false;

  @Input()
  isPasswordInput = false;

  @Input()
  disableAutoFocus = false;

  @Input()
  placeholder = "";

  @Input()
  allowResend = true;

  @Input()
  requiredTime = 60;

  @Output()
  onReady = new EventEmitter<any>();

  @Output()
  onResend = new EventEmitter<any>();

  @ViewChild("verificationBtn")
  verificationBtn!: SwtButton;

  @ViewChild(NgOtpInputComponent, { static: false }) otpInput!: NgOtpInputComponent;

  countdown = this.requiredTime;
  isShowResend = true;
  intervalId: any;

  /**
   * Disabled button verify khi chưa nhập đủ
   */
  disabledBtn = true;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Xử lý khi change OTP
   */
  onChange(e: string) {
    if (e.length === this._length) {
      this.disabledBtn = false;
      setTimeout( () => {
        this.verificationBtn.clickExecute(e);
      }, 10);
    } else {
      this.disabledBtn = true;
      this.verificationBtn.isFinished = true;
      this.verificationBtn.disabled = true;
    }
  }

  /**
   * Emit OTP đã nhập
   */
  fireOTP(e: any) {
    let otp = "";
    otp = parseInt(e) + "";
    if (Number.isNaN(otp) || otp === 'NaN') {
      otp = this.otpInput.currentVal;
    }

    const message = new Message(this, otp);
    message.callback = (response: VerifyOtpResult) => {
      this.verificationBtn.isFinished = true;
      otp = "";
    }
    this.onReady.emit(message);

  }

  /**
   * Gửi lại OTP
   */
  resend(e: any) {
    const message = new Message(this, null);

    this.isShowResend = false;
    this.intervalId = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        this.cancelCountDown();
      }
    }, 1000);

    message.callback = () => {
      this.cancelCountDown();
    };
    this.onResend.emit(message);
  }

  cancelCountDown() {
    this.isShowResend = true;
    this.countdown = this.requiredTime;
    clearInterval(this.intervalId);
  }
}

