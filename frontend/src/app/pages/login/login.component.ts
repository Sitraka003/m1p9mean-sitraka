import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Utilities } from "../../config/utilities";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
	loginForm = new FormGroup({
		email: new FormControl(""),
		password: new FormControl(""),
	});
	// Make the error message appear in view
	hasError = false;

	get email() {
		return this.loginForm.get("email");
	}

	get password() {
		return this.loginForm.get("password");
	}

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		// Reset to top
		Utilities.scrollToTop(this.router);

		if (Utilities.isConnected()) {
			this.router.navigate(["/"]);
		}

		// Form Builder
		this.loginForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});
	}

	login() {
		const credentials = { ...this.loginForm.value };
		this.loginService.login(credentials).subscribe({
			next: (resp) => {
				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(resp.data));
				this.loginForm.reset();

				window.location.replace("/");
			},
			error: (error) => {
				this.hasError = true;
			},
		});
	}

	register() {
		this.router.navigate(["/register"]);
	}
}
