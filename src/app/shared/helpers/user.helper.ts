import { environment } from "src/environments/environment";
import { CookieKey } from "../constants/cookie.key";
import { CookieHelper } from "./cookie.hepler";
import { StringHelper } from "./string.helper";

export class UserHelper {
  static get USER_PERMISSION(): number {
    try {
      const accessToken = CookieHelper.getCookie(`${environment.team}_${CookieKey.ACCESS_TOKEN}`);
      if (accessToken) {
        const permission = StringHelper.parseJwt(accessToken)["permission"];
        return parseInt(permission + "");
      }
    } catch (e) {
      return 0;
    }
    return 0;
  }

  static get USER_ROLES(): string[] {
    try {
      const accessToken = CookieHelper.getCookie(`${environment.team}_${CookieKey.ACCESS_TOKEN}`);
      if (accessToken) {
        const roles = StringHelper.parseJwt(accessToken)["roles"];
        return roles.split(',');
      }
    } catch (e) {
      return [];
    }
    return [];
  }
}
