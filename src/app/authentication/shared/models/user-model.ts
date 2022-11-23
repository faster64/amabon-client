
export class User {
  public id = 0;

  /// Số điện thoại
  public phoneNumber = "";

  /// Email
  public email = "";

  /// First name
  public firstName = "";

  /// Lastname
  public lastName = "";

  /// Mật khẩu
  public password = "";

  /// Fullname
  public fullName = "";

  /// Địa chỉ
  public address = "";

  /// Ngày sinh
  public dateOfBirth = new Date();

  /// Giới tính.0 - Nam, 1 - Nữ, 2 - Khác
  public gender = 0;

  /// Đã Verify hay chưa?
  public isVerified = false;

  /// Đã verify phone hay chưa?
  public isPhoneVerified = false;
}
