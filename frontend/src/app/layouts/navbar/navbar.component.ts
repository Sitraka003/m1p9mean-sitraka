import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../pages/login/login.service";
import { User } from "../../admin/users/user";
import { Utilities } from "../../config/utilities";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	username!: string;
	isConnected = false;
	user!: User;

	constructor(private router: Router) {}

	ngOnInit(): void {
		if (Utilities.isConnected()) {
			this.user = JSON.parse(<string>localStorage.getItem("user"));

			this.isConnected = true;
			this.username = this.user.name + " " + this.user.firstname;
		}
	}

	login(): void {
		this.router.navigate(["/login"]);
	}
	logout(): void {
		localStorage.removeItem("user");
		window.location.replace("/login");
	}
}
