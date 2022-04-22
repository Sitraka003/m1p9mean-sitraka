import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../pages/login/login.service";
import { User } from "../../admin/users/user";
import { Utilities } from "../../config/utilities";
import { BasketModel } from "../../models/basket.model";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	username!: string;
	isConnected = false;
	user!: User;

	constructor(private router: Router, private basketModel: BasketModel) {}

	getBasket(): void {
		this.basketModel.loadBasket();
	}

	ngOnInit(): void {
		if (Utilities.isConnected()) {
			this.user = JSON.parse(<string>localStorage.getItem("user"));

			this.isConnected = true;
			this.username = this.user.name + " " + this.user.firstname;
		}
		this.getBasket();
	}

	get basketLength() {
		return this.basketModel.countDish();
	}

	goTo(route: string): void {
		this.router.navigate([route]);
	}

	login(): void {
		this.router.navigate(["/login"]);
	}

	logout(): void {
		localStorage.removeItem("user");
		window.location.replace("/login");
	}
}
