import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIResult } from "src/app/types/utils.types";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class GenerationService {
	constructor(private readonly _http: HttpClient) {}

	getGenerations(): Observable<APIResult> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json"
		});

		return this._http.get<APIResult>(`${environment.apiURL}/generation`, { headers });
	}
}
