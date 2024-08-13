import { ButtonModule } from 'primeng/button';
import { CardsComponent } from './cards.component';
import { CardsRoutingModule } from './cards-routing.module';
import { CheckDoubleObject } from 'src/app/pipe/checkDoubleObject/checkDoubleObject.pipe';
import { CommonModule } from '@angular/common';
import { DefaultImageDirective } from 'src/app/directive/default-image.directive';
import { ForNumberPipe } from 'src/app/pipe/forNumber/for-number.pipe';
import {ImageModule} from 'primeng/image';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CardsComponent,
    ForNumberPipe,
    CheckDoubleObject,
    DefaultImageDirective
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    ImageModule,
    ButtonModule,
    TranslateModule
  ]
})
export class CardsModule { }
