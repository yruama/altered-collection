import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule
  ],
  exports: [FilterComponent]
})
export class FilterModule { }
