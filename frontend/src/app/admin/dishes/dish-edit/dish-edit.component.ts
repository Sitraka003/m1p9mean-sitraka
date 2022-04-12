import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DishService } from "../dish.service";
import { Dish } from "../dish";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
	selector: "app-dish-edit",
	templateUrl: "./dish-edit.component.html",
})
export class DishEditComponent implements OnInit {
	id!: string;
	dish!: Dish;
	feedback: any = {};

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private dishService: DishService
	) {}

	ngOnInit() {
		this.route.params
			.pipe(
				map((p) => p["id"]),
				switchMap((id) => {
					if (id === "new") {
						return of(new Dish());
					}
					return this.dishService.findById(id);
				})
			)
			.subscribe(
				(dish) => {
					this.dish =
						dish instanceof Dish
							? dish
							: dish.data;
					this.feedback = {};
				},
				(err) => {
					this.feedback = {
						type: "warning",
						message: "Error loading",
					};
				}
			);
	}

	save() {
		this.dishService.save(this.dish).subscribe(
			(dish) => {
				this.dish = dish;
				this.feedback = {
					type: "success",
					message: "Save was successful!",
				};
				setTimeout(async () => {
					await this.router.navigate(["/admin/dishes"]);
				}, 1000);
			},
			(err) => {
				this.feedback = { type: "warning", message: "Error saving" };
			}
		);
	}

	async cancel() {
		await this.router.navigate(["/admin/dishes"]);
	}
}
