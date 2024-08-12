import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pokelist } from "src/app/types/pokelist.types";
import { APIResult } from "src/app/types/utils.types";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class PokelistService {
	constructor(private readonly _http: HttpClient) {}

	addPokeList(pokelist: Pokelist): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.post<APIResult>(`${environment.apiURL}/pokelist`, { pokelist }, { headers });
	}

	getPokeLists(): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.get<APIResult>(`${environment.apiURL}/pokelist`, { headers });
	}

	getPokeList(id: string): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.get<APIResult>(`${environment.apiURL}/pokelist/${id}`, { headers });
	}

	deletePokeList(id: number): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.delete<APIResult>(`${environment.apiURL}/pokelist/${id}`, { headers });
	}
}
