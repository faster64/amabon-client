import { environment } from "src/environments/environment";
import { SnackBar } from "../components/snackbar/snackbar.component";
import { CookieKey } from "../constants/cookie.key";
import { DeviceType } from "../enumerations/device.enum";
import { CookieHelper } from "../helpers/cookie.hepler";
import { StringHelper } from "../helpers/string.helper";
import { SnackBarParameter } from "../models/snackbar/snackbar.param";

export class Utility {
  public static videoExtensions = [
    "m2v",
    "mpg",
    "mp2",
    "mpeg",
    "mpe",
    "mpv",
    "mp4",
    "m4p",
    "m4v",
    "mov",
  ];

  public static imageExtensions = [
    "apng",
    "avif",
    "gif",
    "jpg",
    "jpeg",
    "jfif",
    "pjpeg ",
    "pjp",
    "png",
    "svg",
    "webp",
  ];

  public static changeTitle(title: string) {
    if (title.isNullOrEmpty())
      return;
    (document.querySelector('title') as any).textContent = title;
  }

  public static featureIsDeveloping(e: any) {
    e?.stopPropagation();
    SnackBar.openSnackBarWarning(new SnackBarParameter(this, "Tính năng đang phát triển", "", 2000));
  }

  public static randomInRange(start: number, end: number) {
    return Math.floor(Math.random() * (end - start + 1) + start);
  }

  public static formatCurrency(value: string | number) {
    const re = '\\d(?=(\\d{3})+$)';
    return parseInt(value + "").toFixed(Math.max(0, ~~0)).replace(new RegExp(re, 'g'), '$&,');
  }

  public static getDevice(): DeviceType {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return DeviceType.Mobile;
    }
    return DeviceType.Desktop;
  }

  public static isVideo(url: string) {
    return this.videoExtensions.find(ext => url.toLowerCase().includes(`.${ext}`)) != null;
  }

  public static isImage(url: string) {
    return this.imageExtensions.find(ext => url.toLowerCase().includes(`.${ext}`)) != null;
  }
}
