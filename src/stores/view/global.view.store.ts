import { IStore }                                                 from "../types/store.interface";
import { RootStore }                                              from "../root.store";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export class GlobalViewStore implements IStore {
	loading: boolean;

	constructor(public root: RootStore) {
		this.loading = false;
		makeObservable(this, {
			loading: observable
		});
	}
}
