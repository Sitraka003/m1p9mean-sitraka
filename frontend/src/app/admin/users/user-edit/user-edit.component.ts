import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "../user";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { ROLES } from "../../roles";

@Component({
	selector: "app-user-edit",
	templateUrl: "./user-edit.component.html",
})
export class UserEditComponent implements OnInit {
	id!: string;
	user!: User;
	feedback: any = {};
	isEdit: boolean = false;

	get rolesList() {
		return this.roles.getRoles();
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private roles: ROLES
	) {}

	ngOnInit() {
		this.route.params
			.pipe(
				map((p) => p["id"]),
				switchMap((id) => {
					if (id === "new") {
						this.isEdit = false;
						return of(new User());
					}
					this.isEdit = true;
					return this.userService.findById(id);
				})
			)
			.subscribe(
				(user) => {
					this.user = user instanceof User ? user : user.data;
					this.feedback = {};
				},
				(err) => {
					this.feedback = {
						type: "warning",
						message: "Error loading",
					};
				}
			);
	}

	save() {
		console.log(this.user);
		this.userService.save(this.user).subscribe(
			(user) => {
				this.user = user;
				this.feedback = {
					type: "success",
					message: "Save was successful!",
				};
				setTimeout(async () => {
					await this.router.navigate(["/admin/users"]);
				}, 1000);
			},
			(err) => {
				this.feedback = { type: "warning", message: "Error saving" };
			}
		);
	}

	async cancel() {
		await this.router.navigate(["/admin/users"]);
	}
}
