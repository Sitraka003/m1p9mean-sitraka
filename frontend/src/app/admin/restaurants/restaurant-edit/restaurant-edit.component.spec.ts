import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { RestaurantEditComponent } from "./restaurant-edit.component";
import { RestaurantService } from "../restaurant.service";

describe("RestaurantEditComponent", () => {
	let component: RestaurantEditComponent;
	let fixture: ComponentFixture<RestaurantEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RestaurantEditComponent],
			imports: [
				FormsModule,
				HttpClientTestingModule,
				RouterTestingModule,
			],
			providers: [RestaurantService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RestaurantEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
