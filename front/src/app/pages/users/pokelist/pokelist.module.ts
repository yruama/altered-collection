import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokelistComponent } from './pokelist.component';
import { PokelistRoutingModule } from './pokelist-routing.module';

@NgModule({
  declarations: [
    PokelistComponent
  ],
  imports: [
    CommonModule,
    PokelistRoutingModule
  ],
  exports: [
    PokelistComponent
  ]
})
export class PokelistModule { }
