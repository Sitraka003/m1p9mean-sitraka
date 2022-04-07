import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Constants } from "./constants";

@Injectable()
export class Utilities {
	public static scrollToTop: (router: Router) => void = (router) => {
		router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});
	};

	public static getHost() {
		if (window.location.hostname.includes("localhost"))
			return Constants.API_ENDPOINT_DEV;
		return Constants.API_ENDPOINT_PROD;
	}
}
