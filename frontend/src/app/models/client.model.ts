export class ClientModel {
	name: string;
	firstname: string | undefined;
	email: string;
	password: string;
	confirmPassword: string;
	address: string;
	contact: string | string[] | undefined;

	constructor({
		name,
		firstname,
		email,
		password,
		confirmPassword,
		address,
		contact,
	}: {
		name: string;
		firstname?: string;
		email: string;
		password: string;
		confirmPassword: string;
		address: string;
		contact?: string;
	}) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.firstname = firstname;
		this.address = address;
		this.contact = contact;
	}
}
