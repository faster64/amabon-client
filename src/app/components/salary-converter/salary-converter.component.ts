import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'app-salary-converter',
  templateUrl: './salary-converter.component.html',
  styleUrls: ['./salary-converter.component.scss']
})
export class SalaryConverterComponent extends BaseComponent {

  salary = 21000000;

  baseSalary = 4432000;

  dependents = 0;

  socialInsuranceValue = 0;

  healthInsuranceValue = 0;

  unemploymentInsuranceValue = 0;

  realSalary = 0;

  regions: string[] = [
    'I',
    'II',
    'III',
    'IV',
  ]

  region = this.regions[0];

  breakOn = 0;

  remainder = 0;

  tax = 0;

  insuranceValue = 0;

  isConverted = false;

  @ViewChild("btn1")
  btn1!: SwtButton;

  @ViewChild("btn2")
  btn2!: SwtButton;

  constructor(
    baseService: BaseService,
  ) {
    super(baseService);
  }

  convert(convertType: number) {
    if (!this.validateBeforeConvert())
      return;

    this.socialInsuranceValue = this.baseSalary * 0.08;
    this.healthInsuranceValue = this.baseSalary * 0.015;
    this.unemploymentInsuranceValue = this.baseSalary * 0.01;

    this.insuranceValue = this.socialInsuranceValue + this.healthInsuranceValue + this.unemploymentInsuranceValue;

    /**
     * GROSS sang NET
     */

    if (convertType === 1) {
      // Tính thuê nhập trước thuế
      const beforeTaxValue = this.salary - this.insuranceValue;

      // Kiểm tra xem TNTT đã >= 11 triệu chưa
      if (beforeTaxValue < 11000000) {
        this.realSalary = beforeTaxValue;

      } else {
        //  Thu nhập trước thuế	- 11tr - người phụ thuộc => thu nhập chịu thuế
        this.remainder = beforeTaxValue - 11000000 - this.dependents * 4400000;
        this.tax = this.getTaxValue(this.remainder)['result'];
        this.realSalary = beforeTaxValue - this.tax;
      }
    } else {
      const net = this.salary;
      let gross = this.salary;
      let beforeTaxValue = gross - this.insuranceValue;
      let re = beforeTaxValue - 11000000 - this.dependents * 4400000;
      let tax = Math.ceil(this.getTaxValue(re)['result']);

      while (net + this.insuranceValue + tax != gross) {
        gross++;
        console.log(gross);
        beforeTaxValue = gross - this.insuranceValue;
        re = beforeTaxValue - 11000000 - this.dependents * 4400000;
        tax = Math.ceil(this.getTaxValue(re)['result']);
      }
      console.log(net + this.insuranceValue + tax);
    }

    this.isConverted = true;
    this.btn1.isFinished = true;
    // this.btn2.isFinished = true;
  }

  validateBeforeConvert() {
    if (this.salary === 0) {
      SnackBar.openSnackBarWarning(new SnackBarParameter(null, 'Vui lòng điền thu nhập'));
      return false;
    }

    if (this.baseSalary === 0) {
      SnackBar.openSnackBarWarning(new SnackBarParameter(null, 'Vui lòng điền số tiền đóng bảo hiểm'));
      return false;
    }

    return true;
  }

  getTaxValue(value: number): any {
    if (value <= 0)
      return 0;

    let result = 0;
    let breakOn = 0;

    // Mức 1
    result += value > 5000000 ? 5000000 * 0.05 : value * 0.05; value -= 5000000;
    if (value <= 0) {
      return { breakOn: 1, result: result };
    }

    // Mức 2
    result += value > 5000000 ? 5000000 * 0.1 : value * 0.1; value -= 5000000;
    if (value <= 0) {
      return { breakOn: 2, result: result };
    }

    // Mức 3
    result += value > 8000000 ? 8000000 * 0.15 : value * 0.15; value -= 8000000;
    if (value <= 0) {
      return { breakOn: 3, result: result };
    }

    // Mức 4
    result += value > 14000000 ? 14000000 * 0.2 : value * 0.2; value -= 14000000;
    if (value <= 0) {
      return { breakOn: 4, result: result };
    }

    // Mức 5
    result += value > 20000000 ? 20000000 * 0.25 : value * 0.25; value -= 20000000;
    if (value <= 0) {
      return { breakOn: 5, result: result };
    }

    // Mức 6
    result += value > 28000000 ? 28000000 * 0.3 : value * 0.3; value -= 28000000;
    if (value <= 0) {
      return { breakOn: 6, result: result };
    }

    // Mức 7
    result += value * 0.35;
    return { breakOn: 7, result: result };
  }
}


export class TaxLevel {
  public static Level1 = { value: 5000000, percent: 0.05 };
  public static Level2 = { value: 5000000, percent: 0.1 };
  public static Level3 = { value: 8000000, percent: 0.15 };
  public static Level4 = { value: 14000000, percent: 0.2 };
  public static Level5 = { value: 20000000, percent: 0.25 };
  public static Level6 = { value: 28000000, percent: 0.3 };
  public static Level7 = { value: 0, percent: 0.05 };
}
