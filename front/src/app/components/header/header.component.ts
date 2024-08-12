import { NavigationEnd, Router } from '@angular/router';
import { ViewChild, ViewEncapsulation } from '@angular/core';

import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { MenuItem } from 'primeng/api';
import { ThemeService } from 'src/app/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user/user.service';

interface MenuBloc {
	name: string;
	isHovered: boolean;
	isActive: boolean;
	icon: string;
	command: any;
	key: string;
}

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
	//@ts-ignore
	@ViewChild('profileButton') profileButton: any;

	darkMode = false;

	menu: MenuBloc[] = [{
		name: this._translate.instant('GENERAL.home'),
		isHovered: false,
		isActive: false,
		icon: 'fa-solid fa-house',
		command: async () => { await this.Router.navigate(['/']); },
		key: 'home'
	}, {
		name: this._translate.instant('GENERAL.pokedex'),
		isHovered: false,
		isActive: false,
		icon: 'fa-solid fa-earth-europe',
		command: async () => { await this.Router.navigate(['/pokedex']); },
		key: 'pokedex'
	}, {
		name: this._translate.instant('GENERAL.video-games'),
		isHovered: false,
		isActive: false,
		icon: 'fa-solid fa-gamepad',
		command: async () => { await this.Router.navigate(['/video-games']); },
		key: 'video-games'
	}, {
		name: this._translate.instant('GENERAL.tcg'),
		isHovered: false,
		isActive: false,
		icon: 'fa-solid fa-dice',
		command: async () => { await this.Router.navigate(['/tcg']); },
		key: 'tcg'
	}, {
		name: this._translate.instant(localStorage.getItem('token') ? 'USER.profile' : 'USER.signin'),
		isHovered: false,
		isActive: false,
		icon: 'fa-solid fa-user',
		command: async () => { await this.Router.navigate([localStorage.getItem('token') ? '/users' : '/users/sign-in']); },
		key: 'user'
	}];

	languages: Array<{ code: string; icon: string }> = [
		{
			code: "fr",
			icon: "fi fi-fr"
		},
		{
			code: "en",
			icon: "fi fi-us"
		},
		{
			code: "es",
			icon: "fi fi-es"
		},
		{
			code: "de",
			icon: "fi fi-de"
		},
		{
			code: "it",
			icon: "fi fi-it"
		},
		{
			code: "pt",
			icon: "fi fi-pt"
		},
		{
			code: "ja",
			icon: "fi fi-jp"
		},
		{
			code: "ko",
			icon: "fi fi-kr"
		},
		{
			code: "zh",
			icon: "fi fi-cn"
		}
	];

	items = [
		{
			label: 'Options',
			items: [
				{
					label: 'Update',
					icon: 'pi pi-refresh',
					command: () => {
						console.log("Update")
					}
				},
				{
					label: this._translate.instant('USER.signoff'),
					icon: 'pi pi-times',
					command: () => {
						this.GlobalService.userSignOff();
					}
				}
			]
		},
		{
			label: 'Navigate',
			items: [
				{
					label: 'Angular',
					icon: 'pi pi-external-link',
					url: 'http://angular.io'
				},
				{
					label: 'Router',
					icon: 'pi pi-upload',
					routerLink: '/fileupload'
				}
			]
		}
	];

	currentLanguage: { code: string; icon: string } = this.languages[0];
	constructor(
		private readonly _translate: TranslateService,
		public _user: UserService,
		private readonly _router: Router,
		private readonly _theme: ThemeService,
		private readonly Router: Router,
		private GlobalService: GlobalService
	) {
		Router.events.forEach((event) => {
			if(event instanceof NavigationEnd) {
				let url = event.url === '/' ? '/home' : event.url;

				//On remet tout à false;
				this.menu.forEach((_item: MenuBloc) => {
					_item.isActive = false;
				})

				//On cherche un item à activer
				const menuItem = this.menu.find((_item: MenuBloc) => url.includes(_item.key));
				if (menuItem) menuItem.isActive = true;
			}
		  });
	}

	async ngOnInit(): Promise<void> {
		const generationItems: MenuItem[] = [];

		generationItems.push({
			label: this._translate.instant("GENERAL.all"),
			routerLink: "/pokedex/"
		});

		for (let index = 1; index < 10; index++) {
			const menuItem: MenuItem = {
				label: this._translate.instant("POKEDEX." + index.toString() + "gen"),
				routerLink: "/pokedex/" + index
			};

			generationItems.push(menuItem);
		}

		// Find the current language or use default
		this.currentLanguage = this.languages.find(language => language.code === this._translate.currentLang) ?? this.languages[0];

		/* gestion connexion */
		this.GlobalService.userConnected$.subscribe((userConnected) => {
			this.setUpUserMenu(userConnected);
		});
	}

	async signOff(): Promise<void> {
		localStorage.removeItem("token");
		await this._router.navigate(["/"]);
	}

	onLanguageChange(language: { code: string; icon: string }): void {
		this._translate.use(language.code);
		this.currentLanguage = language;
	}

	changeTheme(name: string): void {
		this._theme.switchTheme(name);
	}

	toggleTheme(): void {
		this.darkMode = !this.darkMode;
	}

	async onCommandClick(command: () => Promise<void>): Promise<void> {
		await command();
	}

	setUpUserMenu(userStatus: boolean) {

		let menuItem: MenuBloc;

		if (userStatus) {
			menuItem = {
				name: this._translate.instant('USER.profile'),
				isHovered: false,
				isActive: false,
				icon: 'fa-solid fa-user',
				command: async () => { this.profileButton.nativeElement.click(); },
				key: `users`
			}
		} else {
			menuItem = {
				name: this._translate.instant('USER.signin'),
				isHovered: false,
				isActive: false,
				icon: 'fa-solid fa-user',
				command: async () => { await this.Router.navigate(['/users/sign-in']); },
				key: 'user'
			}
		}

		this.menu[this.menu.length - 1] = menuItem;
	}
}
