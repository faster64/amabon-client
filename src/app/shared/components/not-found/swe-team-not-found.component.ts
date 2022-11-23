import { Component, OnInit } from '@angular/core';
import { ButtonColor, IconButtonType } from '../../constants/button.constant';
import { Utility } from '../../utils/utility';

@Component({
  selector: 'swt-not-found',
  templateUrl: './swe-team-not-found.component.html',
  styleUrls: ['./swe-team-not-found.component.scss']
})
export class SwtNotFound implements OnInit {
  ButtonColor = ButtonColor;

  IconButtonType = IconButtonType;
  constructor() { }

  ngOnInit(): void {
  }

  back() {
    history.back();
  }

}
