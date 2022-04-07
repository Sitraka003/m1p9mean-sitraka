import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ContactService } from "../../services/contact.service";
import { ContactFormModel } from "../../models/contact-form.model";
import { NavigationEnd, Router } from "@angular/router";

@Component({
	selector: "app-contact",
	templateUrl: "./contact.component.html",
	styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
	// Form group
	contactForm = new FormGroup({
		name: new FormControl(""),
		title: new FormControl(""),
		message: new FormControl(""),
		email: new FormControl(""),
	});
	// Make the error message appear in view
	hasError = false;

	contact = {} as ContactFormModel;

	constructor(
		private contactService: ContactService,
		private formBuilder: FormBuilder,
		private router: Router
	) {}

	ngOnInit(): void {
		// Reset to top
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});

		// Form Builder
		this.contactForm = this.formBuilder.group({
			name: ["", [Validators.required]],
			title: ["", [Validators.required]],
			message: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.email]],
		});
	}

	sendContactForm(): void {
		this.contact.name = this.contactForm.value.name;
		this.contact.title = this.contactForm.value.title;
		this.contact.message = this.contactForm.value.message;
		this.contact.email = this.contactForm.value.email;

		this.contactService.sendContactForm(this.contact).subscribe(
			(data) => {
				console.log(data);
				this.contactForm.reset();
				this.router.navigate(["/"]);
			},
			(error) => {
				this.hasError = true;
			}
		);
	}

	get name() {
		return this.contactForm.get("name");
	}

	get title() {
		return this.contactForm.get("title");
	}

	get message() {
		return this.contactForm.get("message");
	}

	get email() {
		return this.contactForm.get("email");
	}
}
