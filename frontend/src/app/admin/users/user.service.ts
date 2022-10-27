import { User } from "./user";
import { UserFilter } from "./user-filter";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants, ResponseData } from "../../config/constants";
import { Utilities } from "../../config/utilities";

const headers = new HttpHeaders().set("Accept", "application/json");

@Injectable()
export class UserService {
	userList: User[] = [];
	api = Constants.API_ENDPOINT_PROD + "api/user";

	constructor(private http: HttpClient) {}

	findById(id: string): Observable<ResponseData> {
		const url = `${this.api}/${id}`;
		// const params = { _id: id };
		return this.http.get<ResponseData>(url, { headers });
	}

	load(filter: UserFilter) {
		this.find(filter).subscribe(
			(result) => {
				if (result.code === "OK") {
					this.userList = result.data;
				}
			},
			(err) => {
				console.error("error loading", err);
			}
		);
	}

	find(filter: UserFilter): Observable<ResponseData> {
		const params = JSON.parse(JSON.stringify(filter));

		return this.http.get<ResponseData>(this.api, { params, headers });
	}

	save(entity: User): Observable<User> {
		let params = new HttpParams();
		let url = "";
		entity = <User>Utilities.deleteNullOrEmpty(entity);
		if (entity._id) {
			url = `${this.api}/${entity._id.toString()}`;
			params = new HttpParams().set("ID", entity._id.toString());
			return this.http.put<User>(url, entity, { headers, params });
		} else {
			console.log("Entity", entity);
			url = `${this.api}`;
			return this.http.post<User>(url, entity, { headers, params });
		}
	}

	delete(entity: User): Observable<User> {
		let params = new HttpParams();
		let url = "";
		if (entity._id) {
			url = `${this.api}/${entity._id.toString()}`;
			params = new HttpParams().set("ID", entity._id.toString());
			return this.http.delete<User>(url, { headers, params });
		}
		return EMPTY;
	}
}
