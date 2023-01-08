import { RoutingConfig } from "../models/base/routing-config.model";

export class CommonConstant {
  public static readonly ZERO_GUID = "00000000-0000-0000-0000-000000000000";
}

export class ErrorMessageConstant {
  public static readonly HAS_ERROR_MESSAGE = 'Đã xảy ra lỗi. Vui lòng thử lại sau!';
  public static readonly SESSION_EXPRIED = 'Phiên đăng nhập đã hết hạn';
  public static readonly ACCOUNT_NOT_VERIFIED = 'Tài khoản của bạn chưa được xác minh. Vui lòng xác minh tài khoản!';
}

export class PerrmisionConstant {
  public static readonly NOT_PERMISSION = 'Bạn không có quyền thực hiện chức năng này!';
  public static readonly UNDERSTOOD = 'Đã hiểu';
  public static readonly OK = 'OK!';
  public static readonly SESSION_EXPRIED = 'Phiên làm việc đã hết hạn';
}

/**
 * Danh sách routing
 */
export class Routing {
  public static readonly NOT_FOUND = new RoutingConfig('not-found', 'Không tìm thấy :(');
  public static readonly ACCESS_DENIED = new RoutingConfig('access-denied', 'Truy cập bị từ chối');
  public static readonly LOGIN = new RoutingConfig('login', 'Đăng nhập');
  public static readonly LOGOUT = new RoutingConfig('logout', 'Đăng xuất');
  public static readonly REGISTER = new RoutingConfig('register', 'Đăng ký');
  public static readonly VERIFY_REGISTER = new RoutingConfig('authentication/register-verification', 'Xác minh tài khoản');
  public static readonly VERIFY_LOGIN = new RoutingConfig('authentication/login-verification', 'Xác thực bảo mật');
  public static readonly ADMIN = new RoutingConfig('admin', 'Quản lý người dùng');
  public static readonly SETTING = new RoutingConfig('setting', 'Thiết lập');
  public static readonly DASHBOARD = new RoutingConfig('dashboard', 'Tổng quan');
  public static readonly STORAGE = new RoutingConfig('storage', 'Kho lưu trữ');
  public static readonly NOTE_TAKING = new RoutingConfig('note-taking', 'Ghi chú');
  public static readonly DUTY = new RoutingConfig('duty', 'Nhiệm vụ');
  public static readonly CONTACT = new RoutingConfig('contact', 'Liên hệ');
  public static readonly REPORT = new RoutingConfig('report', 'Báo cáo');
  public static readonly TAX_CONVERTER = new RoutingConfig('tax-converter', 'Bộ chuyển đổi thuế');
  public static readonly CALENDAR_CONVERTER = new RoutingConfig('calendar-converter', 'Bộ chuyển đổi lịch');
  public static readonly SALARY_CONVERTER = new RoutingConfig('salary-converter', 'Bộ chuyển đổi lương');
  public static readonly INCOME = new RoutingConfig('income', 'Thu nhập');
  public static readonly PAYMENT = new RoutingConfig('payment', 'Chi tiêu');

}


export class SettingOption {
  public static readonly SECURITY = 'security';
  public static readonly COMMON = 'common';
  public static readonly PRIVACY = 'privacy';
}
