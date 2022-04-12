import { Component, OnInit } from "@angular/core";
import { RestaurantFilter } from "../restaurant-filter";
import { RestaurantService } from "../restaurant.service";
import { Restaurant } from "../restaurant";
import { Router } from "@angular/router";

@Component({
	selector: "app-restaurant",
	templateUrl: "restaurant-list.component.html",
})
export class RestaurantListComponent implements OnInit {
	filter = new RestaurantFilter();
	selectedRestaurant!: Restaurant;
	feedback: any = {};

	get restaurantList(): Restaurant[] {
		return this.restaurantService.restaurantList;
	}

	constructor(
		private restaurantService: RestaurantService,
		private router: Router
	) {}

	ngOnInit() {
		this.search();
	}

	search(): void {
		this.restaurantService.load(this.filter);
	}

	select(selected: Restaurant): void {
		this.selectedRestaurant = selected;
	}

	new(): void {
		this.router.navigate(["admin/restaurants/new"]);
	}

	delete(restaurant: Restaurant): void {
		if (confirm("Are you sure?")) {
			this.restaurantService.delete(restaurant).subscribe({
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

	edit(restaurant: Restaurant): void {
		this.router.navigate(["admin/restaurants/", restaurant._id]);
	}
}
