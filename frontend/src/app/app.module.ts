import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutesModule } from "./app.routes";

@NgModule({
	declarations: [AppComponent, PageNotFoundComponent],
	imports: [BrowserModule, DashboardModule, AppRoutesModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
