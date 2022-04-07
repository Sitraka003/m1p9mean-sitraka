import { Injectable } from "@angular/core";

@Injectable()
export class Constants {
	public static readonly API_ENDPOINT_PROD: string =
		"https://api-ekaly.herokuapp.com/";
	public static readonly API_ENDPOINT_DEV: string = "http://localhost:3000/";
}
