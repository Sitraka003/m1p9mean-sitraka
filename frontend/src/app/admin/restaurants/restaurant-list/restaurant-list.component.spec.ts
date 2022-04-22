import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { RestaurantListComponent } from "./restaurant-list.component";
import { RestaurantService } from "../restaurant.service";

describe("RestaurantListComponent", () => {
	let component: RestaurantListComponent;
	let fixture: ComponentFixture<RestaurantListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RestaurantListComponent],
			imports: [
				FormsModule,
				HttpClientTestingModule,
				RouterTestingModule,
			],
			providers: [RestaurantService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RestaurantListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
