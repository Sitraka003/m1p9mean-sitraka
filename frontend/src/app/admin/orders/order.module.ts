import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderService } from "./order.service";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [OrderListComponent],
	providers: [OrderService],
	exports: [FormsModule],
})
export class OrderModule {}
