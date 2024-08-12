import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class CardsService {
	constructor(private readonly _http: HttpClient) {}

	getCards(offset: number = 0, limit: number = 100, max?: number): Observable<APIResult> {
		const language = navigator.language || 'en';

		const headers = new HttpHeaders({
			'Accept-Language': language,
			"Content-Type": "application/json"
		});

		return this._http.get<APIResult>(`${environment.apiURL}/cards?offset=${offset}&limit=${limit}&max=${max}`, { headers });
	}

	getCardsByName(name: string): Observable<APIResult> {
		return this._http.get<APIResult>(`${environment.cardsdexUrl}/fr/cards?name=${name}`);
	}
}
