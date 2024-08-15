import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class GlobalService {
	apiURL = environment.apiURL;
	assetsURL = environment.assetsURL;

	appLoading = false;
	theme = "light-theme";
	isDarkMode = true;

	private userConnected = new BehaviorSubject<boolean>(localStorage.getItem('token') ? true : false);
  	userConnected$ = this.userConnected.asObservable();

	constructor(private Router: Router) {}


	userSignIn() {
		console.log("Global userSignIn")!
		this.userConnected.next(true);
	}
	
	userSignOff() {
		this.userConnected.next(false);
		localStorage.removeItem('token');
		this.Router.navigate(['/']);
	 }
}
