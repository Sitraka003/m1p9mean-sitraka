import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DishListComponent } from "./dish-list.component";
import { DishService } from "../dish.service";

describe("RestaurantListComponent", () => {
	let component: DishListComponent;
	let fixture: ComponentFixture<DishListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DishListComponent],
			imports: [
				FormsModule,
				HttpClientTestingModule,
				RouterTestingModule,
			],
			providers: [DishService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DishListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
