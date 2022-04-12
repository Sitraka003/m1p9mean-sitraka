import { Component, OnInit } from "@angular/core";
import { UserFilter } from "../user-filter";
import { UserService } from "../user.service";
import { User } from "../user";
import { Router } from "@angular/router";

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
		private userService: UserService,
		private router: Router
	) {}

	ngOnInit() {
		this.search();
	}

	search(): void {
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

	edit(user: User): void {
		this.router.navigate(["admin/users/", user._id]);
	}
}
