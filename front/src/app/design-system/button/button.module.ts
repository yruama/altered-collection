import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ButtonModule as primengButton } from 'primeng/button';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    primengButton,
    FormsModule
  ],
  exports: [ButtonComponent]
})
export class ButtonModule { }
