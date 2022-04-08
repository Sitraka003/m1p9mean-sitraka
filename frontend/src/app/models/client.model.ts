export class ClientModel {
	name: string;
	firstname: string | undefined;
	email: string;
	password: string;
	confirmPassword: string;
	address: string;
	contacts: string | string[] | undefined;

	constructor({
		name,
		firstname,
		email,
		password,
		confirmPassword,
		address,
		contacts,
	}: {
		name: string;
		firstname?: string;
		email: string;
		password: string;
		confirmPassword: string;
		address: string;
		contacts?: string;
	}) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.firstname = firstname;
		this.address = address;
		this.contacts = contacts;
	}
}
