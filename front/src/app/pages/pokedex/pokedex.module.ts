import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FilterModule } from 'src/app/components/filter/filter.module';
import { NgModule } from '@angular/core';
import { PokedexComponent } from './pokedex.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ZeroPaddingPipe } from 'src/app/pipe/zeropadding/zeropadding.pipe';
import { PokemonComponent } from './pokemon/pokemon.component';

@NgModule({
  declarations: [
		PokedexComponent,
    ZeroPaddingPipe,
    PokemonComponent
	],
	imports: [
		PokedexRoutingModule,
    CommonModule,
    TranslateModule,
    TooltipModule,
    ButtonModule,
    SidebarModule,
    FilterModule
	],
	exports: [
		PokedexComponent
	]
})
export class PokedexModule { }
