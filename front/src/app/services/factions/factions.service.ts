import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class FactionsService {
	constructor(private readonly _http: HttpClient) {}

    getFactions() {
        return this._http.get<APIResult>(`${environment.apiURL}/factions`);
    }

}
