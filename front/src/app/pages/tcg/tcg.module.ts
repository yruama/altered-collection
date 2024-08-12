import { CheckDoubleObject } from 'src/app/pipe/checkDoubleObject/checkDoubleObject.pipe';
import { CommonModule } from '@angular/common';
import { DefaultImageDirective } from 'src/app/directive/default-image.directive';
import { ForNumberPipe } from 'src/app/pipe/forNumber/for-number.pipe';
import {ImageModule} from 'primeng/image';
import { NgModule } from '@angular/core';
import { TcgComponent } from './tcg.component';
import { TcgRoutingModule } from './tcg-routing.module';
@NgModule({
  declarations: [
    TcgComponent,
    ForNumberPipe,
    CheckDoubleObject,
    DefaultImageDirective
  ],
  imports: [
    CommonModule,
    TcgRoutingModule,
    ImageModule
  ]
})
export class TcgModule { }
