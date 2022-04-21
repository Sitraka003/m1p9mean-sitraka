import { Component, OnInit } from "@angular/core";
import { Utilities } from "../../config/utilities";
import { User } from "../users/user";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	username!: string;
	isConnected = false;
	user!: User;
	constructor() {}

	ngOnInit(): void {
		if (Utilities.isConnected()) {
			this.user = JSON.parse(<string>localStorage.getItem("user"));

			this.isConnected = true;
			this.username = this.user.name + " " + this.user.firstname;
		}
	}

	logout(): void {
		localStorage.removeItem("user");
		window.location.replace("/login");
	}
}
