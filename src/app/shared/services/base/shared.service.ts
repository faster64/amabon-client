import { Injectable } from '@angular/core';
import { DeviceType } from '../../enumerations/device.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  deviceType = DeviceType.Desktop;

  constructor() {
  }

}
