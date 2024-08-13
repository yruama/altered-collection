import { RouterModule, Routes } from '@angular/router';

import { CollectionsComponent } from './collections.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: CollectionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
