import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PokelistComponent } from './pokelist.component';

const routes: Routes = [{ path: '', component: PokelistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokelistRoutingModule { }
