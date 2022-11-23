import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ButtonColor, ButtonType, IconButtonType } from '../../constants/button.constant';
import { PerrmisionConstant } from '../../constants/common.constant';
import { SnackBarParameter, SnackBarType } from '../../models/snackbar/snackbar.param';
import { TransferDataService } from '../../services/transfer/transfer-data.service';
import { ObjectHelper } from '../../helpers/object-helper';
import { SnackBar } from '../snackbar/snackbar.component';
import { environment } from 'src/environments/environment';
import { LocalStorageKey } from '../../constants/localstorage.key';
import { Utility } from '../../utils/utility';
import { StringHelper } from '../../helpers/string-helper';
import { ActionPermission } from '../../enumerations/permission.enum';

@Component({
  selector: 'swt-button',
  templateUrl: './swt-button.component.html',
  styleUrls: ['./swt-button.component.scss']
})
export class SwtButton implements OnInit, AfterViewInit, OnDestroy {
  IconButtonType = IconButtonType;

  ButtonType = ButtonType;

  private _isFinished = true;
  get isFinished(): boolean {
    return this._isFinished;
  }

  set isFinished(value: boolean) {
    this._isFinished = value;

    if (value === false) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  //#region Input
  @Input()
  buttonType: ButtonType = ButtonType.RAISED;

  @Input()
  actionPermissions: ActionPermission[] = [ActionPermission.None];

  @Input()
  color: ButtonColor = ButtonColor.PRIMARY;

  @Input()
  disabled = false;

  private _text = "Please set button's text";
  @Input()
  get text(): string {
    return this._text;
  }

  set text(value: string) {
    if (value.isNullOrEmpty()) {
      throw Error("value cannot be null or empty");
    }
    this._text = value;
  }

  @Input()
  class = "";

  @Input()
  style = {};

  @Input()
  draggable = false;

  @Input()
  autofocus = false;

  @Input()
  name = "";

  @Input()
  value: any;

  @Input()
  hidden = false;

  @Input()
  width = 0;

  @Input()
  height = 0;

  @Input()
  iconButtonType: IconButtonType = IconButtonType.NONE;

  @Input()
  finishImmediately = false;

  //#endregion

  //#region Output
  @Output()
  onClick = new EventEmitter<any>();

  @Output()
  onDblclick = new EventEmitter<any>();
  //#endregion

  @ViewChild("baseBtn")
  btn!: ElementRef;

  userPermission = 0;

  constructor(public transferDataSV: TransferDataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setSize();
  }

  ngOnDestroy(): void {
    this.isFinished = true;
  }

  getButtonWidth() {
    return this.btn.nativeElement.offsetWidth;
  }

  setSize() {
    if (this.width !== 0) {
      this.btn.nativeElement.style.width = this.width + "px";
    }

    if (this.height !== 0) {
      this.btn.nativeElement.style.height = this.height + "px";
    }
  }

  /**
   * Execute when click button
   */
  clickExecute(e: any) {
    if (!this.isFinished)
      return;

    const hasPermission = this.checkPermission();
    if (hasPermission) {
      this.isFinished = false;
      this.onClick.emit(e);

      if (this.finishImmediately) {
        this.isFinished = true;
      }
    } else {
      this.notPermissionNotify();
    }
  }

  /**
   * Execute when dblclick button
   */
  dlclickExecute(e: any) {
    if (!this.isFinished)
      return;

    const hasPermission = this.checkPermission();
    if (hasPermission) {
      this.isFinished = false;
      this.onDblclick.emit(e);

      if (this.finishImmediately) {
        this.isFinished = true;
      }
    } else {
      this.notPermissionNotify();
    }
  }

  /**
   * Check permission
   */
  checkPermission() {
    // Nếu không yêu cầu permission
    if (this.actionPermissions.find(p => p === ActionPermission.None))
      return true;

    // Lấy quyền người dùng
    if (this.userPermission === 0)
      this.userPermission = this.getUserPermission();

    if (this.userPermission === ActionPermission.All)
      return true;

    return this.actionPermissions.find(p => (this.userPermission & p) !== p) == null;
  }

  /**
   * Trả về quyền của người dùng
   */
  getUserPermission(): number {
    try {
      const accessToken = localStorage.getItem(`${environment.team}_${LocalStorageKey.ACCESS_TOKEN}`);
      if (accessToken) {
        const permission = StringHelper.parseJwt(accessToken)["permission"];
        return parseInt(permission + "");
      }
    } catch (e) {
      return 0;
    }
    return 0;
  }

  /**
   * Bắn noti khi không có quyền
   */
  notPermissionNotify() {
    const snackBarParameter = new SnackBarParameter();
    snackBarParameter.message = PerrmisionConstant.NOT_PERMISSION;
    snackBarParameter.actionText = PerrmisionConstant.OK;
    snackBarParameter.duration = 2000;

    SnackBar.openSnackBarWarning(snackBarParameter);
  }
}
