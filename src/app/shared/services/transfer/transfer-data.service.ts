import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  /**
   * true nếu full page, otherwise false
   */
  listenAdjustUI = new EventEmitter<boolean>();

  /**
   * Lắng nghe sự kiện đăng nhập
   */
  listenLoggedIn = new EventEmitter<any>();

  /**
   * Lắng nghe progress
   */
  listenInProgress = new EventEmitter<boolean>();

  /**
   * Lắng nghe sự thay đổi size sidebar
   */
  listenChangeSizeSidebar = new EventEmitter<string>();

  /**
   * Fire event sau khi lấy về đc setting của user
   */
  userSettingEvent = new EventEmitter<any>();

  initHeader = new EventEmitter<any>();

  locationChange = new EventEmitter<any>();

  constructor() { }
}
