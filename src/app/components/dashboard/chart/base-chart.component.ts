import { Component, EventEmitter, Output } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component";
import { BaseService } from "src/app/shared/services/base/base.service";
import { AnalysisService } from "src/app/shared/services/finance/analysis.service";

@Component({
  selector: '',
  template: '',
  styles: []
})
export class BaseChartComponent extends BaseComponent {

  @Output()
  loaded = new EventEmitter<boolean>();

  constructor(
    baseService: BaseService,
    public analysisService: AnalysisService,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
