import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutesModule } from "./app.routes";
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { HomeComponent } from "./pages/home/home.component";
import { FooterComponent } from "./layouts/footer/footer.component";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		PageNotFoundComponent,
		HomeComponent,
		FooterComponent,
	],
	imports: [BrowserModule, AppRoutesModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
