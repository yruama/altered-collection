import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TcgComponent } from './tcg.component';

const routes: Routes = [{ path: '', component: TcgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TcgRoutingModule { }
