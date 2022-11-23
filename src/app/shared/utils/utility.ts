import { environment } from "src/environments/environment";
import { SnackBar } from "../components/snackbar/snackbar.component";
import { LocalStorageKey } from "../constants/localstorage.key";
import { StringHelper } from "../helpers/string-helper";
import { SnackBarParameter } from "../models/snackbar/snackbar.param";

export class Utility {
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

  public static getUserPermission() {
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
}
