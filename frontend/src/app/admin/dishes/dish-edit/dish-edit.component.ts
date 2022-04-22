import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DishService } from "../dish.service";
import { Dish } from "../dish";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { RestaurantService } from "../../restaurants/restaurant.service";
import { RestaurantFilter } from "../../restaurants/restaurant-filter";

@Component({
	selector: "app-dish-edit",
	templateUrl: "./dish-edit.component.html",
})
export class DishEditComponent implements OnInit {
	isEdit: boolean = true;
	id!: string;
	dish!: Dish;
	images: string[] = [];
	imagesNames: string[] = [];
	feedback: any = {};

	get names() {
		return this.imagesNames.length > 0 ? this.imagesNames.join(", ") : "Choose file..."
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private dishService: DishService,
		private restaurantService: RestaurantService
	) {}

	get restaurant() {
		return this.restaurantService.restaurantList;
	}

	ngOnInit() {
		this.restaurantService.load(new RestaurantFilter());
		this.route.params
			.pipe(
				map((p) => p["id"]),
				switchMap((id) => {
					if (id === "new") {
						this.isEdit = false;
						return of(new Dish());
					}
					return this.dishService.findById(id);
				})
			)
			.subscribe(
				(dish) => {
					this.dish = dish instanceof Dish ? dish : dish.data;
					this.images = this.dish.images;
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
		this.dish.images = this.images;
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

	handleUpload(event: any) {
		const files = event.target.files;

		console.log(files);
		if (files && files.length > 0) {
			this.imagesNames = [];
			this.images = [];
			for(const file of files) {
				this.imagesNames.push(file.name);
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					if (reader.result && typeof reader.result === "string") {
						this.images.push(reader.result);
					}
				};
			}
		}
		console.log(this.images)

	}
}
