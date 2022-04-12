import { Component, OnInit } from "@angular/core";
import { map, switchMap } from "rxjs/operators";
import { Restaurant } from "../../admin/restaurants/restaurant";
import { ActivatedRoute, Router } from "@angular/router";
import { DishService } from "../../admin/dishes/dish.service";
import { Dish } from "../../admin/dishes/dish";

@Component({
	selector: "app-dish",
	templateUrl: "./dish.component.html",
	styleUrls: ["./dish.component.css"]
})
export class DishComponent implements OnInit {
	id!: string;
	dish!: Dish;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private dishService: DishService
	) {
	}

	ngOnInit(): void {
		this.route.params
			.pipe(
				map((p) => p["id"]),
				switchMap((id) => {
					return this.dishService.findById(id);
				})
			)
			.subscribe(
				(dish) => {
					this.dish =
						dish instanceof Dish
							? dish
							: dish.data;
				},
				(err) => {
					 console.log(err)
					// this.router.navigate(["/"]);
				}
			);
	}

}
