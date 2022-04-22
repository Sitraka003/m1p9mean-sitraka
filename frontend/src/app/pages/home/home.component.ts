import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Restaurant } from "../../admin/restaurants/restaurant";
import { RestaurantService } from "../../admin/restaurants/restaurant.service";
import { RestaurantFilter } from "../../admin/restaurants/restaurant-filter";
import { DishService } from "../../admin/dishes/dish.service";
import { DishFilter } from "../../admin/dishes/dish-filter";
import { Dish } from "../../admin/dishes/dish";
import { BasketModel } from "../../models/basket.model";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	restoFilter = new RestaurantFilter();
	dishFilter = new DishFilter();

	constructor(
		private restaurantService: RestaurantService,
		private dishService: DishService,
		private router: Router,
		private basketModel: BasketModel
	) {}

	get restaurantList(): Restaurant[] {
		return this.restaurantService.restaurantList;
	}

	get dishList(): Dish[] {
		return this.dishService.dishList;
	}

	getRestaurants(): void {
		this.restaurantService.load(this.restoFilter);
	}

	getDishes(): void {
		this.dishService.load(this.dishFilter);
	}

	getBasket(): void {
		this.basketModel.loadBasket();
	}

	ngOnInit(): void {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});
		this.getRestaurants();
		this.getDishes();
		this.getBasket();
	}

	goTo(item: any, type: string) {
		if (type === "restaurant") {
			this.router.navigate(["/restaurant/", <Restaurant>item._id]);
		} else if (type === "dish") {
			this.router.navigate(["/dish/", <Dish>item._id]);
		}
	}

	addToCart(item: Dish) {
		this.basketModel.addDish(item, 1);
	}
}
