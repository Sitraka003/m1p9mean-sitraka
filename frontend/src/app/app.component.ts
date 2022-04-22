import { Component, OnInit } from "@angular/core";
import { Spinkit } from "ng-http-loader";
import { Router } from "@angular/router";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
	public spinkit = Spinkit;
	isAdmin = false;
	title = "frontend";

	ngOnInit(): void {
		this.isAdmin = window.location.pathname.split("/")[1] === "admin";
	}
}
