import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RestaurantListComponent } from "./restaurant-list/restaurant-list.component";
import { RestaurantEditComponent } from "./restaurant-edit/restaurant-edit.component";
import { RestaurantService } from "./restaurant.service";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [RestaurantListComponent, RestaurantEditComponent],
	providers: [RestaurantService],
	exports: [FormsModule]
})
export class RestaurantModule {
}
