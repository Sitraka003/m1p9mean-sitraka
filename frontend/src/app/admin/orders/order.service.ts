import { Order } from "./order";
import { OrderFilter } from "./order-filter";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ResponseData } from "../../config/constants";

const headers = new HttpHeaders().set("Accept", "application/json");

@Injectable()
export class OrderService {
	orderList: Order[] = [];
	api = "http://localhost:3000/api/order";

	constructor(private http: HttpClient) {}

	findById(id: string): Observable<ResponseData> {
		const url = `${this.api}/${id}`;
		// const params = { _id: id };
		return this.http.get<ResponseData>(url, { headers });
	}

	findByResto(resto_id: string): Observable<ResponseData> {
		const url = `${this.api}/restaurant/${resto_id}`;

		return this.http.get<ResponseData>(url, { headers });
	}

	loadByResto(resto_id: string) {
		this.findByResto(resto_id).subscribe(
			(result) => {
				if (result.code === "OK") {
					this.orderList = result.data;
				}
			},
			(err) => {
				console.error("error loading", err);
			}
		);
	}

	load(filter: OrderFilter) {
		this.find(filter).subscribe(
			(result) => {
				if (result.code === "OK") {
					this.orderList = result.data;
					console.log(this.orderList);
				}
			},
			(err) => {
				console.error("error loading", err);
			}
		);
	}

	find(filter: OrderFilter): Observable<ResponseData> {
		const params = {};

		return this.http.get<ResponseData>(this.api, { params, headers });
	}

	delete(entity: Order): Observable<Order> {
		let params = new HttpParams();
		let url = "";
		if (entity._id) {
			url = `${this.api}/${entity._id.toString()}`;
			params = new HttpParams().set("ID", entity._id.toString());
			return this.http.delete<Order>(url, { headers, params });
		}
		return EMPTY;
	}
}
