import { HttpClient, HttpClientModule } from "@angular/common/http";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { TranslateLoader, TranslateModule, TranslateStore } from "@ngx-translate/core";

import { APP_INITIALIZER } from '@angular/core';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuardService } from "./services/auth-guard/auth-guard.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HeaderModule } from "./components/header/header.module";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from "./services/loader/loader.service";
import { MessageService } from "primeng/api";
import { NgModule } from "@angular/core";
import { ToastModule } from 'primeng/toast';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService } from '@ngx-translate/core';

export function appInitializerFactory(translate: TranslateService) {
	return () => new Promise<void>((resolve: any) => {
		// Load your translation files here
		// For example:
		translate.use('fr').subscribe(() => {
			// You can perform additional actions here if needed
			resolve(null);
		});
	});
}

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		LoaderComponent
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		HeaderModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		ToastModule

	],
	providers: [
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService,
		AuthGuardService,
		MessageService,
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializerFactory,
			deps: [TranslateService],
			multi: true,
		},
		LoaderService
	],
	bootstrap: [AppComponent],
})



export class AppModule { }
