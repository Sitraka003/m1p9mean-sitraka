import {Dish} from "../admin/dishes/dish";

export type DishBasket = {
	dish: Dish,
	quantity: number,
	subTotal?: number
}

export class BasketModel {
	dishBasket!: any[];

	constructor() {
	}

	loadBasket() {
		const _basket = localStorage.getItem("basket");
		if (_basket && _basket != "") {
			this.dishBasket = JSON.parse(_basket);
		} else {
			this.dishBasket = [];
		}
	}


	addDish(dish: Dish, quantity: number) {
		const item = {
			dish: dish,
			quantity: quantity,
			subTotal: dish.price * quantity
		}
		const inBasket = this.dishBasket.find((element) => {
			return item.dish._id === element.dish._id;
		})
		if (!inBasket) {
			this.dishBasket.push(item);
			localStorage.setItem("basket", JSON.stringify(this.dishBasket));
		}
	}

	removeDish(item: any) {
		this.dishBasket = this.dishBasket.filter((value) => {
			return value.dish._id !== item.dish._id
		});
	}

	countDish() {
		return this.dishBasket.length
	}

	get total() {
		let total = 0;
		if (this.dishBasket) {
			this.dishBasket.forEach((current: DishBasket) => {
				total += current.dish.price * current.quantity;
			});
		}
		return total;
	}
}
