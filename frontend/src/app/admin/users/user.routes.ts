import { Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserEditComponent } from "./user-edit/user-edit.component";

export const USER_ROUTES: Routes = [
	{
		path: "",
		component: UserListComponent,
	},
	{
		path: "client",
		component: UserListComponent,
	},
	{
		path: "deliverer",
		component: UserListComponent,
	},
	{
		path: ":id",
		component: UserEditComponent,
	},
];
