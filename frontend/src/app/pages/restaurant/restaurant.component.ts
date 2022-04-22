import { Component, OnInit } from "@angular/core";
import { Restaurant } from "../../admin/restaurants/restaurant";
import { RestaurantService } from "../../admin/restaurants/restaurant.service";
import { map, switchMap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { Dish } from "../../admin/dishes/dish";
import { DishService } from "../../admin/dishes/dish.service";
import { BasketModel } from "../../models/basket.model";

@Component({
	selector: "app-restaurant",
	templateUrl: "./restaurant.component.html",
	styleUrls: ["./restaurant.component.css"],
})
export class RestaurantComponent implements OnInit {
	id!: string;
	restaurant!: Restaurant;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private restaurantService: RestaurantService,
		private dishService: DishService,
		private basketModel: BasketModel
	) {}

	get dishList(): Dish[] {
		return this.dishService.dishList;
	}

	getDishes(): void {
		this.dishService.loadByResto(this.restaurant._id);
	}

	ngOnInit(): void {
		this.route.params
			.pipe(
				map((p) => p["id"]),
				switchMap((id) => {
					return this.restaurantService.findById(id);
				})
			)
			.subscribe(
				(restaurant) => {
					this.restaurant =
						restaurant instanceof Restaurant
							? restaurant
							: restaurant.data;
					this.getDishes();
				},
				(err) => {
					this.router.navigate(["/"]);
				}
			);
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
