import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { InsuranceByRegion } from 'src/app/shared/constants/insurance-by-region.constant';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'app-salary-converter',
  templateUrl: './salary-converter.component.html',
  styleUrls: ['./salary-converter.component.scss']
})
export class SalaryConverterComponent extends BaseComponent {

  salary = 0;

  gross = 0;

  baseSalary = InsuranceByRegion.I;

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

  taxDetails: any[] = [
    { text: 'Từ 0 -> 5 triệu VNĐ (5%)', value: 0 },
    { text: 'Trên 5 triệu VNĐ đến 10 triệu VNĐ (10%)', value: 0 },
    { text: 'Trên 10 triệu VNĐ đến 18 triệu VNĐ	(15%)', value: 0 },
    { text: 'Trên 18 triệu VNĐ đến 32 triệu VNĐ	(20%)', value: 0 },
    { text: 'Trên 32 triệu VNĐ đến 52 triệu VNĐ	(25%)', value: 0 },
    { text: 'Trên 52 triệu VNĐ đến 80 triệu VNĐ	(30%)', value: 0 },
    { text: 'Trên 80 triệu VNĐ (35%)', value: 0 }
  ];

  remainder = 0;

  tax = 0;

  insuranceValue = 0;

  isConverted = false;

  convertType = 1;

  @ViewChild("btn1")
  btn1!: SwtButton;

  @ViewChild("btn2")
  btn2!: SwtButton;

  constructor(
    baseService: BaseService,
  ) {
    super(baseService);
  }

  grossToNet(value: number) {
    // Tính thuê nhập trước thuế
    const beforeTaxValue = value - this.insuranceValue;

    // Kiểm tra xem TNTT đã >= 11 triệu chưa
    if (beforeTaxValue < 11000000) {
      return beforeTaxValue;
    }
    //  Thu nhập trước thuế	- 11tr - người phụ thuộc => thu nhập chịu thuế
    this.remainder = beforeTaxValue - 11000000 - this.dependents * 4400000;
    this.tax = this.getTaxValue(this.remainder)['result'];
    return beforeTaxValue - this.tax;
  }

  netToGross(value: number) {
    const net = value;
    let count = 1;

    // Mức 1
    let result = Math.ceil((net + 0.95 * this.insuranceValue - 220000 * this.dependents - 550000) / 0.95);

    while (count++ <= 7 && Math.abs(value - this.grossToNet(result)) >= 1) {
      if (result < net) {
        return net + this.insuranceValue;
      }

      // Mức 2
      if (count === 2) {
        result = Math.ceil((net + 0.9 * this.insuranceValue - 440000 * this.dependents - 1350000) / 0.9);
      }

      // Mức 3
      if (count === 3) {
        result = Math.ceil((net + 0.85 * this.insuranceValue - 660000 * this.dependents - 2400000) / 0.85);
      }

      // Mức 4
      if (count === 4) {
        result = Math.ceil((net + 0.8 * this.insuranceValue - 880000 * this.dependents - 3850000) / 0.8);
      }

      // Mức 5
      if (count === 5) {
        result = Math.ceil((net + 0.75 * this.insuranceValue - 1100000 * this.dependents - 6000000) / 0.75);
      }

      // Mức 6
      if (count === 6) {
        result = Math.ceil((net + 0.7 * this.insuranceValue - 1320000 * this.dependents - 9150000) / 0.7);
      }

      // Mức 7
      if (count === 7) {
        result = Math.ceil((net + 0.65 * this.insuranceValue - 1540000 * this.dependents - 13700000) / 0.65);
      }
    }
    return result;
  }

  convert(convertType: number) {
    if (!this.validateBeforeConvert())
      return;

    this.convertType = convertType;
    this.socialInsuranceValue = this.baseSalary * 0.08;
    this.healthInsuranceValue = this.baseSalary * 0.015;
    this.unemploymentInsuranceValue = this.baseSalary * 0.01;

    this.insuranceValue = this.socialInsuranceValue + this.healthInsuranceValue + this.unemploymentInsuranceValue;

    this.resetTaxs();
    if (convertType === 1) {
      this.gross = this.salary;
      this.realSalary = this.grossToNet(this.salary);
    } else {
      this.realSalary = this.netToGross(this.salary);
      this.gross = this.realSalary;
    }

    this.isConverted = true;
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
      return { breakOn: 0, result: 0 };

    let result = 0;
    let tax = 0;

    // Mức 1
    tax = value > 5000000 ? 5000000 * 0.05 : value * 0.05; value -= 5000000;
    result += tax;
    this.taxDetails[0].value = tax;
    if (value <= 0) {
      return { breakOn: 1, result: result };
    }

    // Mức 2
    tax = value > 5000000 ? 5000000 * 0.1 : value * 0.1; value -= 5000000;
    result += tax;
    this.taxDetails[1].value = tax;
    if (value <= 0) {
      return { breakOn: 2, result: result };
    }

    // Mức 3
    tax = value > 8000000 ? 8000000 * 0.15 : value * 0.15; value -= 8000000;
    result += tax;
    this.taxDetails[2].value = tax;
    if (value <= 0) {
      return { breakOn: 3, result: result };
    }

    // Mức 4
    tax = value > 14000000 ? 14000000 * 0.2 : value * 0.2; value -= 14000000;
    result += tax;
    this.taxDetails[3].value = tax;
    if (value <= 0) {
      return { breakOn: 4, result: result };
    }

    // Mức 5
    tax = value > 20000000 ? 20000000 * 0.25 : value * 0.25; value -= 20000000;
    result += tax;
    this.taxDetails[4].value = tax;
    if (value <= 0) {
      return { breakOn: 5, result: result };
    }

    // Mức 6
    tax = value > 28000000 ? 28000000 * 0.3 : value * 0.3; value -= 28000000;
    result += tax;
    this.taxDetails[5].value = tax;
    if (value <= 0) {
      return { breakOn: 6, result: result };
    }

    // Mức 7
    tax = value * 0.35;
    result += tax;
    this.taxDetails[6].value = tax;
    return { breakOn: 7, result: result };
  }

  resetTaxs() {
    this.tax = 0;
    for (let i = 0; i <= 6; i++)
      this.taxDetails[i].value = 0;
  }

  regionChanged(e: any) {
    this.region = e.value;
    this.baseSalary = (InsuranceByRegion as any)[this.region];
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
