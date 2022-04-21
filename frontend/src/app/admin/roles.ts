export class ROLES {
	role!: string;
	roles!: string[];
	static CLIENT = "Client";
	static ADMIN_EKALY = "Admim Ekaly";
	static ADMIN_RESTAURANT = "Admin Restaurant";
	static DELIVERER = "Deliverer";

	geRoles() {
		this.roles = [
			ROLES.CLIENT,
			ROLES.ADMIN_EKALY,
			ROLES.ADMIN_RESTAURANT,
			ROLES.DELIVERER,
		];
		return this.roles;
	}
}
