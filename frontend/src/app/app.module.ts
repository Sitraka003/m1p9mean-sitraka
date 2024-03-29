import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutesModule } from "./app.routes";
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { HomeComponent } from "./pages/home/home.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgHttpLoaderModule } from "ng-http-loader";
import { RegisterComponent } from "./pages/register/register.component";
import { AdminModule } from "./admin/admin.module";
import { RestaurantComponent } from "./pages/restaurant/restaurant.component";
import { ClickStopPropagationDirective } from "./directives/click-stop-propagation.directive";
import { DishComponent } from "./pages/dish/dish.component";
import { LoginComponent } from "./pages/login/login.component";
import { LoginService } from "./pages/login/login.service";
import { BasketModel } from "./models/basket.model";
import { BasketComponent } from "./pages/basket/basket.component";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		PageNotFoundComponent,
		HomeComponent,
		FooterComponent,
		ContactComponent,
		RegisterComponent,
		RestaurantComponent,
		ClickStopPropagationDirective,
		DishComponent,
		LoginComponent,
		BasketComponent,
	],
	imports: [
		BrowserModule,
		AdminModule,
		AppRoutesModule,
		HttpClientModule,
		NgHttpLoaderModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [LoginService, BasketModel],
	bootstrap: [AppComponent],
	exports: [ClickStopPropagationDirective],
})
export class AppModule {}
