import { ButtonCheckboxModule } from 'src/app/design-system/button-checkbox/button-checkbox.module';
import { ButtonModule } from 'src/app/design-system/button/button.module';
import { CardsComponent } from './cards.component';
import { CardsRoutingModule } from './cards-routing.module';
import { CheckDoubleObject } from 'src/app/pipe/checkDoubleObject/checkDoubleObject.pipe';
import { CommonModule } from '@angular/common';
import { DefaultImageDirective } from 'src/app/directive/default-image.directive';
import { FilterModule } from 'src/app/components/filter/filter.module';
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
    TranslateModule,
    ButtonModule,
    ButtonCheckboxModule,
    FilterModule
  ]
})
export class CardsModule { }
