import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonColor, IconButtonType } from '../../constants/button.constant';
import { Routing } from '../../constants/common.constant';

@Component({
  selector: 'swt-not-found',
  templateUrl: './swt-not-found.component.html',
  styleUrls: ['./swt-not-found.component.scss']
})
export class SwtNotFound implements OnInit {
  ButtonColor = ButtonColor;

  IconButtonType = IconButtonType;
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate([`/${Routing.DASHBOARD.path}`]);
  }

}
