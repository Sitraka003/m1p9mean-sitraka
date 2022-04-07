import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../config/contants";
import { ContactFormModel } from "../models/contact-form.model";

@Injectable({
	providedIn: "root",
})
export class ContactService {
	apiUrl = Constants.API_ENDPOINT_PROD + "api/contact/";

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	constructor(private httpClient: HttpClient) {}

	public sendContactForm(
		contactFormModel: ContactFormModel
	): Observable<ContactFormModel> {
		return this.httpClient.post<ContactFormModel>(
			this.apiUrl + "sendEmail",
			JSON.stringify(contactFormModel),
			this.httpOptions
		);
	}
}
