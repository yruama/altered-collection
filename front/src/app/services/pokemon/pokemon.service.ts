import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class PokemonService {
	constructor(private readonly _http: HttpClient) { }

	getPokemon(id: string): Observable<APIResult> {
		const language = navigator.language || 'en';

		const headers = new HttpHeaders({
			'Accept-Language': language,
			"Content-Type": "application/json"
		});

		return this._http.get<APIResult>(`${environment.apiURL}/pokemon/${id}`, { headers });
	}

	getPokemons(offset: number = 0, limit: number = 100, max?: number): Observable<APIResult> {
		const language = navigator.language || 'en';

		const headers = new HttpHeaders({
			'Accept-Language': language,
			"Content-Type": "application/json"
		});

		return this._http.get<APIResult>(`${environment.apiURL}/pokemon?offset=${offset}&limit=${limit}&max=${max}`, { headers });
	}

	getPokemonEvolutions(chainId: string): Observable<APIResult> {
		const language = navigator.language || 'en';

		const headers = new HttpHeaders({
			'Accept-Language': language,
			"Content-Type": "application/json"
		});

		return this._http.get<APIResult>(`${environment.apiURL}/pokemon/evolutions/${chainId}`, { headers });
	}

	getUserPokedex(): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.get<APIResult>(`${environment.apiURL}/pokemon/user-pokedex`, { headers });
	}

	addPokemonsToUserPokedex(pokemonIds: number[]): Observable<APIResult> {
		const token = localStorage.getItem("token");
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.post<APIResult>(`${environment.apiURL}/pokemon/user-pokedex`, { pokemonIds }, { headers });
	}

	test() {
		const language = navigator.language || 'en';

		const headers = new HttpHeaders({
			'Accept-Language': language,
			"Content-Type": "application/json"
		});

		return this._http.get<APIResult>(`${environment.apiURL}/test/`, { headers });
	}
}
