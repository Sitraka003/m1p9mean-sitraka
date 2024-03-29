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

	public static deleteNullOrEmpty(obj: any) {
		const ret = obj;
		for (const key in ret) {
			if (
				ret.key === null ||
				(typeof ret.key === "string" && ret.key.trim() === "")
			) {
				delete ret.key;
			}
		}
		return ret;
	}

	public static isConnected() {
		const _user = localStorage.getItem("user");
		return !!(_user && _user !== "");
	}

	public static getConnected() {
		return JSON.parse(<string>localStorage.getItem("user"));
	}
}
