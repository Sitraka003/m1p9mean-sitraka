import { Component, OnInit } from "@angular/core";
import { BasketModel } from "../../models/basket.model";
import { Utilities } from "../../config/utilities";
import { Router } from "@angular/router";
import { OrderService } from "../../services/order.service";

@Component({
	selector: "app-basket",
	templateUrl: "./basket.component.html",
	styleUrls: ["./basket.component.css"],
})
export class BasketComponent implements OnInit {
	hasError = false;

	constructor(
		private basketModel: BasketModel,
		private orderService: OrderService,
		private router: Router
	) {}

	get basket() {
		return this.basketModel.dishBasket;
	}

	get total() {
		return this.basketModel.total;
	}

	get connected() {
		return Utilities.isConnected();
	}

	get user() {
		return Utilities.getConnected();
	}

	ngOnInit(): void {
		this.basketModel.loadBasket();
	}

	goTo(choice: string) {
		if (choice.toLowerCase() === "register") {
			this.router.navigate(["/register"]);
		} else if (choice.toLowerCase() === "login") {
			this.router.navigate(["/login"]);
		}
	}

	remove(item: any) {
		this.basketModel.removeDish(item);
	}

	validate() {
		if (Utilities.isConnected() && this.total > 0) {
			this.orderService.validateOrder().subscribe({
				next: () => {
					this.router.navigate(["/"]);
					this.basketModel.clearBasket();
				},
				error: (error) => {
					console.log(error);
					this.hasError = true;
				},
			});
		}
	}
}
