import { Component, OnInit } from "@angular/core";
import { DishFilter } from "../dish-filter";
import { DishService } from "../dish.service";
import { Dish } from "../dish";
import { Router } from "@angular/router";

@Component({
	selector: "app-Dish",
	templateUrl: "dish-list.component.html",
})
export class DishListComponent implements OnInit {
	filter = new DishFilter();
	selectedDish!: Dish;
	feedback: any = {};

	get dishList(): Dish[] {
		return this.DishService.dishList;
	}

	constructor(private DishService: DishService, private router: Router) {}

	ngOnInit() {
		this.search();
	}

	search(): void {
		this.DishService.load(this.filter);
	}

	select(selected: Dish): void {
		this.selectedDish = selected;
	}

	new(): void {
		this.router.navigate(["admin/dishes/new"]);
	}

	delete(Dish: Dish): void {
		if (confirm("Are you sure?")) {
			this.DishService.delete(Dish).subscribe({
				next: () => {
					this.feedback = {
						type: "success",
						message: "Delete was successful!",
					};
					setTimeout(() => {
						this.search();
					}, 1000);
				},
				error: (err) => {
					this.feedback = {
						type: "warning",
						message: "Error deleting.",
					};
				},
			});
		}
	}

	edit(Dish: Dish): void {
		this.router.navigate(["admin/dishes/", Dish._id]);
	}
}
