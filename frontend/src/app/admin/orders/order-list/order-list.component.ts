import { Component, OnInit } from "@angular/core";
import { OrderFilter } from "../order-filter";
import { OrderService } from "../order.service";
import { Order } from "../order";
import { Router } from "@angular/router";

@Component({
	selector: "app-Order",
	templateUrl: "order-list.component.html",
})
export class OrderListComponent implements OnInit {
	filter = new OrderFilter();
	selectedOrder!: Order;
	feedback: any = {};

	get orderList(): Order[] {
		return this.OrderService.orderList;
	}

	constructor(private OrderService: OrderService, private router: Router) {}

	ngOnInit() {
		this.search();
	}

	search(): void {
		this.OrderService.load(this.filter);
	}

	select(selected: Order): void {
		this.selectedOrder = selected;
	}

	delete(Order: Order): void {
		if (confirm("Are you sure?")) {
			this.OrderService.delete(Order).subscribe({
				next: () => {
					this.feedback = {
						type: "success",
						message: "Delete was successful!",
					};
					setTimeout(() => {
						this.search();
					}, 1000);
				},
				error: (err) => {
					this.feedback = {
						type: "warning",
						message: "Error deleting.",
					};
				},
			});
		}
	}
}
