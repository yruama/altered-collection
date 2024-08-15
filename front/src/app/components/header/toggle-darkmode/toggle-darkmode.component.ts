import { Component } from "@angular/core";
import { GlobalService } from "src/app/services/global/global.service";
import { ThemeService } from "src/app/theme.service";

@Component({
	selector: "app-toggle-darkmode",
	templateUrl: "./toggle-darkmode.component.html",
	styleUrls: ["./toggle-darkmode.component.scss"]
})
export class ToggleDarkmodeComponent {
	constructor(private readonly ThemeService: ThemeService,
		public GlobalService: GlobalService) { }

	toggleTheme(): void {

		this.GlobalService.isDarkMode = !this.GlobalService.isDarkMode;
		localStorage.setItem("darkmode", String(this.GlobalService.isDarkMode));
		this.GlobalService.theme = this.GlobalService.theme === "light-theme" ? "dark-theme" : "light-theme";
		this.ThemeService.switchTheme(this.GlobalService.theme);
	}
}
