import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	constructor(@Inject(DOCUMENT) private readonly _document: Document) { }

	themes = ['light-theme', "dark-theme"]

	switchTheme(theme: string) {
		const themeLink = this._document.getElementById('app-theme') as HTMLLinkElement;

		console.log("themeLink : ", themeLink)

		if (!this.verificationTheme(theme)) theme = "light-theme";

		if (themeLink) {
			localStorage.setItem("theme", theme);
			themeLink.href = theme + '.css';
		}
	}

	verificationTheme(theme: string): boolean {
		return this.themes.includes(theme)
	}
}
