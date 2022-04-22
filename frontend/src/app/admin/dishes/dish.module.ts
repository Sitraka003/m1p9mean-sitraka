import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DishListComponent } from "./dish-list/dish-list.component";
import { DishEditComponent } from "./dish-edit/dish-edit.component";
import { DishService } from "./dish.service";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [DishListComponent, DishEditComponent],
	providers: [DishService],
	exports: [FormsModule],
})
export class DishModule {}
