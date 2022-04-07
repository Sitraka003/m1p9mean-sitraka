export class ContactFormModel {
	name: string;
	title: string;
	message: string;
	email: string;

	constructor(name: string, title: string, message: string, email: string) {
		this.name = name;
		this.title = title;
		this.message = message;
		this.email = email;
	}
}
