import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(
		private readonly _router: Router,
		private readonly _user: UserService
	) { }

	async canActivate(): Promise<boolean> {
		if (!this._user.isAuthenticated()) {
			await this._router.navigate(["auth/sign-in"]);
			return false;
		}
		return true;
	}
}
