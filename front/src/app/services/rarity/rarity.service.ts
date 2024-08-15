import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class RarityService {
	constructor(private readonly _http: HttpClient) {}

	getRarity(): Observable<APIResult> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json"
		});

		return this._http.get<APIResult>(`${environment.apiURL}/rarity`, { headers });
	}
}