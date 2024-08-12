import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
	declarations: [
		UsersComponent
	],
	imports: [
		UsersRoutingModule,

	],
	exports: [
		UsersComponent
	]
})
export class UsersModule { }
