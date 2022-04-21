import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientModel } from "../models/client.model";
import { Utilities } from "../config/utilities";
import { BasketModel, DishBasket } from "../models/basket.model";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	apiUrl = Utilities.getHost() + "api/order/";
	basket!: string | null;

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};
	private dishBasket!: any[];

	constructor(private httpClient: HttpClient) {}

	public validateOrder(): Observable<BasketModel> {
		this.basket = localStorage.getItem("basket");
		if (this.basket != null) {
			this.dishBasket = JSON.parse(this.basket);
		} else {
			throw "Basket not found";
		}

		const basket = this.dishBasket.map((currentDish) => {
			return {
				dish: currentDish.dish._id,
				number: currentDish.quantity,
			};
		});
		const body = {
			basket: basket,
			client: Utilities.getConnected()._id,
			address: Utilities.getConnected().address,
		};
		return this.httpClient.post<BasketModel>(
			this.apiUrl + "create",
			JSON.stringify(body),
			this.httpOptions
		);
	}
}
