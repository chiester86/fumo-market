import { makeAutoObservable } from "mobx";
import { deleteFumoFromCart } from "../http/fumoAPI";

export default class CartStoreStore {
  constructor() {
    this._totalPrice = 0;
    this._cart = [];
    makeAutoObservable(this);
  }

  async setDeleteItemCart(fumo, isAuth = false) {
    if (isAuth) {
      await deleteFumoFromCart(fumo.id).then(() => {
        this._cart = this._cart.filter((item) => item.id !== fumo.id);
        this._totalPrice -= fumo.price * fumo.count;
      });
    } else {
      this._cart = this._cart.filter((item) => item.id !== fumo.id);
      this._totalPrice -= fumo.price * fumo.count;

      localStorage.setItem("cart", JSON.stringify(this._cart));
    }
  }

  setCart(item, isAuth = false) {
    const checkFumoInCart = this._cart.findIndex((fumo) => fumo.id === item.id);
    if (checkFumoInCart < 0) {
      this._cart = [...this._cart, { count: 1, ...item }];
      let totalPrice = 0;
      this._cart.forEach(
        (fumo) => (totalPrice += Number(fumo.price * fumo.count))
      );
      this._totalPrice = totalPrice;
    }

    if (!isAuth) {
      localStorage.setItem("cart", JSON.stringify(this._cart));
    }
  }

  setDeleteAllFumoFromCart() {
    this._totalPrice = 0;
    return (this._cart = []);
  }

  setCountFumo(fumoId, action, isAuth = false) {
    const itemInd = this._cart.findIndex((item) => item.id === fumoId);
    const itemInState = this._cart.find((fumo) => fumo.id === fumoId);
    if (action === "+") {
      const newItem = {
        ...itemInState,
        count: ++itemInState.count,
      };
      this._cart = [
        ...this._cart.slice(0, itemInd),
        newItem,
        ...this._cart.slice(itemInd + 1),
      ];
    } else {
      const newItem = {
        ...itemInState,
        count: itemInState.count === 1 ? 1 : --itemInState.count,
      };
      this._cart = [
        ...this._cart.slice(0, itemInd),
        newItem,
        ...this._cart.slice(itemInd + 1),
      ];
    }

    if (!isAuth) {
      localStorage.setItem("cart", JSON.stringify(this._cart));
    }

    let totalPrice = 0;
    this._cart.forEach(
      (fumo) => (totalPrice += Number(fumo.price * fumo.count))
    );
    this._totalPrice = totalPrice;
  }

  resetCart() {
    this._cart = [];
    this._totalPrice = 0;
    localStorage.removeItem("cart");
  }

  get Cart() {
    return this._cart;
  }

  get Price() {
    return this._totalPrice;
  }
}
