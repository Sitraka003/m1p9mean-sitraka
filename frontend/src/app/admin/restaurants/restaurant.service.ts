import { Restaurant } from "./restaurant";
import { RestaurantFilter } from "./restaurant-filter";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants, ResponseData } from "../../config/constants";

const headers = new HttpHeaders().set("Accept", "application/json");

@Injectable()
export class RestaurantService {
	restaurantList: Restaurant[] = [];
	api = Constants.API_ENDPOINT_PROD + "api/restaurant";

	constructor(private http: HttpClient) {}

	findById(id: string): Observable<ResponseData> {
		const url = `${this.api}/${id}`;
		// const params = { _id: id };
		return this.http.get<ResponseData>(url, { headers });
	}

	load(filter: RestaurantFilter) {
		this.find(filter).subscribe(
			(result) => {
				if (result.code === "OK") {
					this.restaurantList = result.data;
				}
			},
			(err) => {
				console.error("error loading", err);
			}
		);
	}

	find(filter: RestaurantFilter): Observable<ResponseData> {
		const params = {
			name: filter.name,
		};

		return this.http.get<ResponseData>(this.api, { headers });
	}

	save(entity: Restaurant): Observable<Restaurant> {
		let params = new HttpParams();
		let url = "";
		if (entity._id) {
			url = `${this.api}/${entity._id.toString()}`;
			params = new HttpParams().set("ID", entity._id.toString());
			return this.http.put<Restaurant>(url, entity, { headers, params });
		} else {
			url = `${this.api}`;
			return this.http.post<Restaurant>(url, entity, { headers, params });
		}
	}

	delete(entity: Restaurant): Observable<Restaurant> {
		let params = new HttpParams();
		let url = "";
		if (entity._id) {
			url = `${this.api}/${entity._id.toString()}`;
			params = new HttpParams().set("ID", entity._id.toString());
			return this.http.delete<Restaurant>(url, { headers, params });
		}
		return EMPTY;
	}
}
