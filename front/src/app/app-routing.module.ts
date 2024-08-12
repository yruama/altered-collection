import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
	{ path: '', loadChildren: async () => (await import('./pages/home/home.module')).HomeModule },
	{ path: 'users', loadChildren: async () => (await import('./pages/users/users.module')).UsersModule },
	{ path: 'pokedex', loadChildren: async () => (await import('./pages/pokedex/pokedex.module')).PokedexModule },
	{ path: 'cards', loadChildren: async () => (await import('./pages/cards/cards.module')).CardsModule },
	{ path: 'users/collection', loadChildren: async () => (await import('./pages/users/pokelist/pokelist.module')).PokelistModule },
	{ path: 'users/sign-up', loadChildren: async () => (await import('./pages/users/auth/sign-up/sign-up.module')).SignUpModule },
	{ path: 'users/sign-in', loadChildren: async () => (await import('./pages/users/auth/sign-in/sign-in.module')).SignInModule }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
