import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PokedexComponent } from './pokedex.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
  { path: '', component: PokedexComponent },
  { path: ':id', component: PokemonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule { }
