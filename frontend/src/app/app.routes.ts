import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { RegisterComponent } from "./pages/register/register.component";

const appRoutes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "contact", component: ContactComponent },
	{ path: "register", component: RegisterComponent },

	{ path: "**", component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutesModule {}
