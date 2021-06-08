import { IStore }             from "../types/store.interface";
import { RootStore }          from "../root.store";
import { makeAutoObservable } from "mobx";

export class GlobalViewStore implements IStore {
	loading: boolean;

	constructor(public root: RootStore) {
		this.init();
		makeAutoObservable(this);
	}

	init() {
		this.loading = false;
	}
}
