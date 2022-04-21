import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { AdminRoutesModule } from "./admin.routes";
import { NavbarComponent } from "./navbar/navbar.component";
import { RestaurantModule } from "./restaurants/restaurant.module";
import { DishModule } from "./dishes/dish.module";
import { UserModule } from "./users/user.module";
import { ROLES } from "./roles";
import { LoggedInGuard } from "../config/guard.service";
import { OrderModule } from "./orders/order.module";

@NgModule({
	declarations: [AdminComponent, NavbarComponent],
	imports: [
		CommonModule,
		AdminRoutesModule,
		RestaurantModule,
		DishModule,
		UserModule,
		OrderModule,
	],
	providers: [ROLES, LoggedInGuard],
})
export class AdminModule {}
