import { IStore }                     from "../types/store.interface";
import { RootStore }                  from "../root.store";
import { makeObservable, observable } from "mobx";

export class GlobalViewStore implements IStore {
	loading: boolean;

	constructor(public root: RootStore) {
		this.loading = true;
		makeObservable(this, {
			loading: observable
		});
	}
}
