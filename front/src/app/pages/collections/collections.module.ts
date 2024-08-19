import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'src/app/design-system/button/button.module';
import { CollectionsComponent } from './collections.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { CommonModule } from '@angular/common';
import { FilterModule } from 'src/app/components/filter/filter.module';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgModule } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    CollectionsComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    FormsModule,
    RadioButtonModule,
    FilterModule,
    AvatarModule,
    AvatarGroupModule,
    TableModule,
    ButtonModule,
    InputSwitchModule,
    InputNumberModule
  ]
})
export class CollectionsModule { }
