import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants, ResponseData } from "../../config/constants";

const headers = new HttpHeaders().set("Accept", "application/json");

@Injectable()
export class LoginService {
	isConnected = false;
	api = Constants.API_ENDPOINT_PROD + "/api/client/login";
	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	constructor(private http: HttpClient) {}

	login(credentials: {
		email: string;
		password: string;
	}): Observable<ResponseData> {
		const url = `${this.api}`;
		const body = JSON.stringify(credentials);
		return this.http.post<ResponseData>(url, body, this.httpOptions);
	}
}
