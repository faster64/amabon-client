export enum GenderType {
  Male = 0,
  Female = 1,
  Other = 2
}

export enum EntityState {
  Add = 1,
  Edit = 2,
  Delete = 3,
}

export enum FormMode {
  None = 0,
  View = 1,
  Add = 2,
  Edit = 3,
}

export enum FilterCondition {
  Equal = 1,
  GreaterThan = 2,
  GE = 3, // Greater than or equal to
  LessThan = 4,
  LE = 5, // Less than or equal to
  Contains = 6,
  StartWiths = 7,
  EndWiths = 8,
}

export enum OtpType {
  None = 0,
  Password = 1,
  Verify = 2,
  TFA = 3,
}

export enum MfaType {
  None = 0,
  Email = 1,
  Phone = 2,
}

export enum MessageBoxType {
  None = 0,
  Confirm = 1,
  ConfirmDelete = 2,
  Information = 3,
}

export enum ExportType {
  All = 1,
  OnScreen = 2,
}

export enum IssueState {
  Unsolved = 1,
  Solved = 2,
}

export enum GroupBoxFieldType {
  Text = 1,
  Number = 2,
  Date = 3,
  ComboBox = 4,
  CheckBox = 5,
  Image = 6,
  TextArea = 7,
  Link = 8,
  Tag = 9,
}

export enum Priority {
  Urgent = 1,
  Important = 2,
  High = 3,
  Medium = 4,
  Low = 5,
}

/// Enum tháng trong năm
export enum MonthEnum {
  None = 0,
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}

export enum DutyStatus {
  Processing = 1,
  Done = 2,
  Overdue = 3,
}
