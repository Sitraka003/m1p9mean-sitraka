export class ROLES {
	role!: string;
	roles!: string[];

	geRoles() {
		this.roles = [
			"Admim Ekaly",
			"Admin Restaurant",
			"Client",
			"Deliverer"];
		return this.roles
	}
}
