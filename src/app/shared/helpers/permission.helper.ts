import { environment } from "src/environments/environment";
import { CookieKey } from "../constants/cookie.key";
import { CookieHelper } from "./cookie.hepler";
import { StringHelper } from "./string.helper";

export class PermissionHelper {
  public static getUserPermission() {
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
}
