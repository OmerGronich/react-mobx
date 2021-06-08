import { IStore }             from "../types/store.interface";
import { RootStore }          from "../root.store";
import { makeAutoObservable } from "mobx";

export enum TodoFilterOptions {
	ALL       = "All",
	ACTIVE    = "Active",
	COMPLETED = "Completed"
}


export class GlobalViewStore implements IStore {
	loading: boolean;
	currentTodoFilter: TodoFilterOptions;

	constructor(public root: RootStore) {
		this.init();
		makeAutoObservable(this);
	}

	init() {
		this.loading           = false;
		this.currentTodoFilter = TodoFilterOptions.ALL;
	}

	setCurrentFilter(filter: TodoFilterOptions) {
		this.currentTodoFilter = filter;
	}
}
