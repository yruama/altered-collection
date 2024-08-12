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

	getSets(): Observable<APIResult> {
		return this._http.get<APIResult>(`${environment.cardsdexUrl}/fr/sets`);
	}

	getCardsByName(name: string): Observable<APIResult> {
		return this._http.get<APIResult>(`${environment.cardsdexUrl}/fr/cards?name=${name}`);
	}
}
