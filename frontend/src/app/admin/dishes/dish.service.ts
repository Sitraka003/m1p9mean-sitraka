import { Dish } from "./dish";
import { DishFilter } from "./dish-filter";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants, ResponseData } from "../../config/constants";

const headers = new HttpHeaders().set("Accept", "application/json");

@Injectable()
export class DishService {
	dishList: Dish[] = [];
	api = Constants.API_ENDPOINT_PROD + "api/dish";

	constructor(private http: HttpClient) {}

	findById(id: string): Observable<ResponseData> {
		const url = `${this.api}/${id}`;
		// const params = { _id: id };
		return this.http.get<ResponseData>(url, { headers });
	}

	findByResto(resto_id: string): Observable<ResponseData> {
		const url = `${this.api}/resto/${resto_id}`;

		return this.http.get<ResponseData>(url, { headers });
	}

	loadByResto(resto_id: string) {
		this.findByResto(resto_id).subscribe(
			(result) => {
				if (result.code === "OK") {
					this.dishList = result.data;
				}
			},
			(err) => {
				console.error("error loading", err);
			}
		);
	}

	load(filter: DishFilter) {
		this.find(filter).subscribe(
			(result) => {
				if (result.code === "OK") {
					this.dishList = result.data;
				}
			},
			(err) => {
				console.error("error loading", err);
			}
		);
	}

	find(filter: DishFilter): Observable<ResponseData> {
		const params = {
			restaurant: filter.restaurant,
		};

		return this.http.get<ResponseData>(this.api, { params, headers });
	}

	save(entity: Dish): Observable<Dish> {
		let params = new HttpParams();
		let url = "";
		if (entity._id) {
			url = `${this.api}/${entity._id.toString()}`;
			params = new HttpParams().set("ID", entity._id.toString());
			return this.http.put<Dish>(url, entity, { headers, params });
		} else {
			url = `${this.api}`;
			return this.http.post<Dish>(url, entity, { headers, params });
		}
	}

	delete(entity: Dish): Observable<Dish> {
		let params = new HttpParams();
		let url = "";
		if (entity._id) {
			url = `${this.api}/${entity._id.toString()}`;
			params = new HttpParams().set("ID", entity._id.toString());
			return this.http.delete<Dish>(url, { headers, params });
		}
		return EMPTY;
	}
}
