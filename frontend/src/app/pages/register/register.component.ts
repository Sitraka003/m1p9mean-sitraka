import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ClientModel } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { NavigationEnd, Router } from "@angular/router";
import { Utilities } from "../../config/utilities";
import { Constants } from "../../config/constants";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
	phonePattern = Constants.PHONE_PATTERN;
	passwordPattern = Constants.PASSWORD_PATTERN;
	// Form group
	registerForm = new FormGroup({
		name: new FormControl(""),
		firstname: new FormControl(""),
		email: new FormControl(""),
		password: new FormControl(""),
		confirmPassword: new FormControl(""),
		address: new FormControl(""),
		contact: new FormControl(""),
	});
	// Make the error message appear in view
	hasError = false;

	client = {} as ClientModel;

	constructor(
		private clientService: ClientService,
		private formBuilder: FormBuilder,
		private router: Router
	) {}

	ngOnInit(): void {
		// Reset to top
		Utilities.scrollToTop(this.router);

		// Form Builder
		this.registerForm = this.formBuilder.group({
			name: ["", [Validators.required]],
			firstname: ["", []],
			password: ["", [Validators.required]],
			confirmPassword: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.email]],
			address: ["", [Validators.required]],
			contact: ["", []],
		});
	}

	validateRegister(): void {
		this.client = { ...this.registerForm.value };

		this.clientService.registerClient(this.client).subscribe(
			(data) => {
				console.log(data);
				this.registerForm.reset();
				this.router.navigate(["/"]); // Todo replace with login
			},
			(error) => {
				this.hasError = true;
			}
		);
	}

	showHidePassword(e: MouseEvent): void {
		let iElement: Element = (e.target as Element).getElementsByTagName(
			"i"
		)[0] as Element;
		if (!iElement) iElement = e.target as Element;
		if (iElement?.classList.contains("fa-eye")) {
			iElement.parentElement?.parentElement?.previousElementSibling?.setAttribute(
				"type",
				"password"
			);
			iElement?.classList.add("fa-eye-slash");
			iElement?.classList.remove("fa-eye");
		} else {
			iElement.parentElement?.parentElement?.previousElementSibling?.setAttribute(
				"type",
				"text"
			);

			iElement?.classList.add("fa-eye");
			iElement?.classList.remove("fa-eye-slash");
		}
	}

	get name() {
		return this.registerForm.get("name");
	}

	get firstname() {
		return this.registerForm.get("firstname");
	}

	get email() {
		return this.registerForm.get("email");
	}

	get password() {
		return this.registerForm.get("password");
	}

	get confirmPassword() {
		return this.registerForm.get("confirmPassword");
	}

	get address() {
		return this.registerForm.get("address");
	}

	get contact() {
		return this.registerForm.get("contact");
	}
}
