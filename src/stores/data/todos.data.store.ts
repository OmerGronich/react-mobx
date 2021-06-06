import { IStore }             from "../types/store.interface";
import { RootStore }          from "../root.store";
import { Todo }               from "./entity/todo.entity";
import { makeAutoObservable } from "mobx";

export class TodosStore implements IStore {
	todos: Todo[] = [];

	constructor(public root: RootStore) {
		makeAutoObservable(this);
	}

	async init() {
		this.root.globalViewStore.loading = true;
		this.todos                        = await this.root.todosAdapter.getItems();
		this.root.globalViewStore.loading = false;
	}
}
