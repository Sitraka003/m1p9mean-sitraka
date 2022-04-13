import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list/user-list.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserService } from "./user.service";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [UserListComponent, UserEditComponent],
	providers: [UserService],
	exports: [FormsModule],
})
export class UserModule {}
