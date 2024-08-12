import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class GlobalService {
	apiURL = environment.apiURL;
	assetsURL = environment.assetsURL;

	appLoading = false;
	theme = "arya-orange";
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
