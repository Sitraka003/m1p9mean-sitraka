import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { RESTAURANT_ROUTES } from "./restaurants/restaurant.routes";
import { DISH_ROUTES } from "./dishes/dish.routes";
import { USER_ROUTES } from "./users/user.routes";
import { LoggedInGuard } from "../config/guard.service";

export const adminRoutes: Routes = [
	{
		path: "admin",
		component: AdminComponent,
		children: [
			{
				path: "restaurants",
				children: RESTAURANT_ROUTES,
			},
			{
				path: "dishes",
				children: DISH_ROUTES,
			},
			{
				path: "users",
				children: USER_ROUTES,
			},
		],
		canActivate: [LoggedInGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(adminRoutes)],
	exports: [RouterModule],
})
export class AdminRoutesModule {}
