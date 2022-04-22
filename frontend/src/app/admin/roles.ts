export class ROLES {
	role!: string;
	roles!: string[];
	static CLIENT = "Client";
	static ADMIN_EKALY = "Admim Ekaly";
	static ADMIN_RESTAURANT = "Admin Restaurant";
	static DELIVERER = "Deliverer";

	getRoles() {
		this.roles = [
			ROLES.ADMIN_EKALY,
			ROLES.ADMIN_RESTAURANT,
			ROLES.CLIENT,
			ROLES.DELIVERER,
		];
		return this.roles;
	}
}
