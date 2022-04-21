export class Order {
	_id!: string;
	orderId!: string;
	basket!: [string];
	restaurant!: {
		_id: string;
		name: string;
		description: string;
		address: string;
	};
	total!: string;
	client!: {
		_id: string;
		name: string;
		firstname: string;
		email: string;
	};
	address!: string;
	deliverer!: string;
	deliveryfee!: string;
	status!: number;
}
