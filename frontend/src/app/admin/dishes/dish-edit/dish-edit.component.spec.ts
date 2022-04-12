import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DishEditComponent } from "./dish-edit.component";
import { DishService } from "../dish.service";

describe("RestaurantEditComponent", () => {
	let component: DishEditComponent;
	let fixture: ComponentFixture<DishEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DishEditComponent],
			imports: [
				FormsModule,
				HttpClientTestingModule,
				RouterTestingModule,
			],
			providers: [DishService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DishEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
