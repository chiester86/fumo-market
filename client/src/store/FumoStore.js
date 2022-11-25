import { makeAutoObservable } from "mobx";

export default class FumoStore {
  constructor() {
    this._fumo = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 9;
    makeAutoObservable(this);
  }

  setFumo(fumo) {
    this._fumo = fumo;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  get fumo() {
    return this._fumo;
  }

  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
}
