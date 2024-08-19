import { ButtonCheckboxModule } from 'src/app/design-system/button-checkbox/button-checkbox.module';
import { ButtonModule } from 'src/app/design-system/button/button.module';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { FormsModule } from '@angular/forms';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ButtonCheckboxModule,
    PanelModule,
    TranslateModule,
    ChipModule,
    MultiSelectModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule
  ],
  exports: [FilterComponent]
})
export class FilterModule { }
