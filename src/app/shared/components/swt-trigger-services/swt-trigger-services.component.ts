import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-swt-trigger-services',
  template: '<swt-button (onClick)="triggerServices()" text="Khởi chạy services" [finishImmediately]="true">trigger</swt-button>',
  styles: []
})
export class SwtTriggerServicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  triggerServices() {
    for (let i = 2; i <= 6; i++) {
      setTimeout(() => {
        window.open(`https://103.179.191.139:600${i}/health`);
      }, i * 1000);
    }
  }
}
