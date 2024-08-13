import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pokelist } from "src/app/types/pokelist.types";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class CollectionsService {
	constructor(private readonly _http: HttpClient) {}

	getCollections(): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const language = navigator.language || 'en-GB';
		const headers = new HttpHeaders({
			'Accept-Language': language,
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.get<APIResult>(`${environment.apiURL}/collections/`, { headers });
	}

	getOwnCollections(): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const language = navigator.language || 'en-GB';
		const headers = new HttpHeaders({
			'Accept-Language': language,
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.get<APIResult>(`${environment.apiURL}/collections/altered`, { headers });
	}

	generateList(): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const language = navigator.language || 'en-GB';
		const headers = new HttpHeaders({
			'Accept-Language': language,
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.get<APIResult>(`${environment.apiURL}/collections/generate`, { headers });
	}
}
