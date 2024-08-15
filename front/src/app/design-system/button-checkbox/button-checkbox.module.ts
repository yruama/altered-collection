import { ButtonCheckboxComponent } from './button-checkbox.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ButtonModule as primengButton } from 'primeng/button';

@NgModule({
  declarations: [ButtonCheckboxComponent],
  imports: [
    CommonModule,
    primengButton,
    FormsModule
  ],
  exports: [ButtonCheckboxComponent]
})
export class ButtonCheckboxModule { }
