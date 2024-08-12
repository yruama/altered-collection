import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { GlobalService } from "./services/global/global.service";
import { ThemeService } from "./theme.service";
import { UserService } from "./services/user/user.service";
import { Router } from "@angular/router";
import { LoaderService } from "./services/loader/loader.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "Pokedex";
	isLoading = false;

	constructor(
		private readonly _primengConfig: PrimeNGConfig,
		private readonly _translate: TranslateService,
		public GlobalService: GlobalService,
		private ThemeService: ThemeService,
		private UserService: UserService,
		private Router: Router,
		private LoaderService: LoaderService
	) {
		this.GlobalService.appLoading = true;
		_translate.setDefaultLang("fr");
		_translate.use("fr").subscribe({
			next: () => { },
			error: err => { console.log("error : ", err); },
			complete: () => {
				this.GlobalService.appLoading = false;
			}
		});
	}

	ngOnInit(): void {
		this._primengConfig.ripple = true;
		/* Theming */
		let localDarMode = localStorage.getItem('darkmode') != null ? JSON.parse(localStorage.getItem('darkmode')!) : null;
		this.GlobalService.isDarkMode = localDarMode ?? this.GlobalService.isDarkMode;
		this.GlobalService.theme = localStorage.getItem("theme") || this.GlobalService.theme;
		this.ThemeService.switchTheme(this.GlobalService.theme);

		/* gestion loader */
		this.LoaderService.isLoading$.subscribe((isLoading) => {
			this.isLoading = isLoading;
		});

		/* check connexion */
		if (localStorage.getItem("token")) {
			// On catch un token, on vérifie qu'il est bon
			this.UserService.getByToken().subscribe({
				next: () => { },
				error: (err) => {
					console.error("[SignIn] : ", err)
					localStorage.removeItem('token');
					this.Router.navigate(['/users/sign-in'])
				},
				complete: () => { }
			})
		}


	}
}
