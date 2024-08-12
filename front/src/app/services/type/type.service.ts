import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class TypeService {
	constructor(private readonly _http: HttpClient) {}

	getTypes(): Observable<APIResult> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json"
		});

		return this._http.get<APIResult>(`${environment.apiURL}/type`, { headers });
	}
}
