import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientModel } from "../models/client.model";
import { Utilities } from "../config/utilities";

@Injectable({
	providedIn: "root",
})
export class ClientService {
	apiUrl = Utilities.getHost() + "api/client/";

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	constructor(private httpClient: HttpClient) {}

	public registerClient(clientModel: ClientModel): Observable<ClientModel> {
		return this.httpClient.post<ClientModel>(
			this.apiUrl + "register",
			JSON.stringify(clientModel),
			this.httpOptions
		);
	}
}
