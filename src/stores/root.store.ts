import { TodosStore }         from "./data/todos.data.store";
import { UsersStore }         from "./data/users.data.store";
import { TodosAdapter }       from "../adapters/todos.adapter";
import { GlobalViewStore }    from "./view/global.view.store";
import { makeAutoObservable } from "mobx";

export class RootStore {
	todosStore: TodosStore;
	usersStore: UsersStore;
	globalViewStore: GlobalViewStore;

	todosAdapter: TodosAdapter;

	constructor() {
		this.todosStore      = new TodosStore(this);
		this.usersStore      = new UsersStore(this);
		this.globalViewStore = new GlobalViewStore(this);
		this.todosAdapter    = new TodosAdapter();
	}

	async init() {
		await this.todosStore.init();
	}
}

export const rootStore = new RootStore();
