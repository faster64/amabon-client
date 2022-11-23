import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoading } from './spinner-loading/spinner-loading.component';
import { SkeletonLoading } from './skeleton-loading/skeleton-loading.component';

@NgModule({
  declarations: [SpinnerLoading, SkeletonLoading],
  imports: [
    CommonModule,
  ],
  exports: [SpinnerLoading, SkeletonLoading],
})
export class SwtLoadingModule { }
