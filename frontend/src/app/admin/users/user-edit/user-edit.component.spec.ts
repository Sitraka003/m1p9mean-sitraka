import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { UserEditComponent } from "./user-edit.component";
import { UserService } from "../user.service";

describe("RestaurantEditComponent", () => {
	let component: UserEditComponent;
	let fixture: ComponentFixture<UserEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserEditComponent],
			imports: [
				FormsModule,
				HttpClientTestingModule,
				RouterTestingModule,
			],
			providers: [UserService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
