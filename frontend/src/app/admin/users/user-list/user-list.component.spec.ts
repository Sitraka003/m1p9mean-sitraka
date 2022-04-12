import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { UserListComponent } from "./user-list.component";
import { UserService } from "../user.service";

describe("RestaurantListComponent", () => {
	let component: UserListComponent;
	let fixture: ComponentFixture<UserListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserListComponent],
			imports: [
				FormsModule,
				HttpClientTestingModule,
				RouterTestingModule,
			],
			providers: [UserService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
