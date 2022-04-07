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

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		PageNotFoundComponent,
		HomeComponent,
		FooterComponent,
		ContactComponent,
		RegisterComponent,
	],
	imports: [
		BrowserModule,
		AppRoutesModule,
		HttpClientModule,
		NgHttpLoaderModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
