import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RestaurantComponent } from "./pages/restaurant/restaurant.component";
import { DishComponent } from "./pages/dish/dish.component";
import { LoginComponent } from "./pages/login/login.component";
import { BasketComponent } from "./pages/basket/basket.component";

const appRoutes: Routes = [
	{ path: "", component: HomeComponent, pathMatch: "full" },
	{ path: "restaurant/:id", component: RestaurantComponent },
	{ path: "basket", component: BasketComponent },
	{ path: "dish/:id", component: DishComponent },
	{ path: "contact", component: ContactComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "login", component: LoginComponent },

	{ path: "**", component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutesModule {}
