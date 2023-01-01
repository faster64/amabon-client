import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoading } from './spinner-loading/spinner-loading.component';
import { SkeletonLoading } from './skeleton-loading/skeleton-loading.component';
import { SwtSavingComponent } from './swt-saving/swt-saving.component';
import { SwtDeletingComponent } from './swt-deleting/swt-deleting.component';

@NgModule({
  declarations: [SpinnerLoading, SkeletonLoading, SwtSavingComponent, SwtDeletingComponent],
  imports: [
    CommonModule,
  ],
  exports: [SpinnerLoading, SkeletonLoading, SwtSavingComponent, SwtDeletingComponent],
})
export class SwtLoadingModule { }
