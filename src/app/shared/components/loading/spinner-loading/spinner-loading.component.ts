import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoading implements OnInit {

  @Input("showLoadingText")
  isShowLoadingText: boolean = false;

  @Input("loadingText")
  loadingText: string = "Đang tải...";

  constructor() { }

  ngOnInit(): void {
  }

}
