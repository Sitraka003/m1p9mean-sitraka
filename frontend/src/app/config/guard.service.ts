import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Utilities } from "./utilities";

@Injectable()
export class LoggedInGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate() {
		if (!Utilities.isConnected()) {
			window.location.replace("/login");
			return false;
		}
		return true;
	}
}
