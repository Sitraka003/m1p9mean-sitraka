import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { UserFilter } from "../user-filter";
import { UserService } from "../user.service";
import { User } from "../user";
import { ActivatedRoute, Router } from "@angular/router";
import { ROLES } from "../../roles";

@Component({
	selector: "app-user",
	templateUrl: "user-list.component.html",
})
export class UserListComponent implements OnInit {
	filter = new UserFilter();
	selectedUser!: User;
	feedback: any = {};

	get userList(): User[] {
		return this.userService.userList;
	}

	constructor(
		private route: ActivatedRoute,
		private userService: UserService,
		private readonly location: Location,
		private router: Router
	) {}

	ngOnInit() {
		this.search(this.location.path());
	}

	search(url: string): void {
		if (url === "/admin/users/client") {
			this.filter.role = ROLES.CLIENT;
		} else if (url === "/admin/users/deliverer") {
			this.filter.role = ROLES.DELIVERER;
		}
		this.userService.load(this.filter);
	}

	select(selected: User): void {
		this.selectedUser = selected;
	}

	new(): void {
		this.router.navigate(["admin/users/new"]);
	}

	delete(user: User): void {
		if (confirm("Are you sure?")) {
			this.userService.delete(user).subscribe({
				next: () => {
					this.feedback = {
						type: "success",
						message: "Delete was successful!",
					};
					setTimeout(() => {
						this.search(this.location.path());
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

	edit(user: User): void {
		this.router.navigate(["admin/users/", user._id]);
	}
}
