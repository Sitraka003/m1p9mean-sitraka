import { Injectable } from "@angular/core";

@Injectable()
export class Constants {
	public static readonly API_ENDPOINT_PROD: string =
		"https://api-ekaly.herokuapp.com/";
	public static readonly API_ENDPOINT_DEV: string = "http://localhost:3000/";
	public static readonly PASSWORD_PATTERN: string =
		"^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$";
	public static readonly PHONE_PATTERN: string =
		"^03[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
}
