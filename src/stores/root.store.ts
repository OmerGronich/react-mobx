import { TodosStore }      from "./data/todos.data.store";
import { UsersStore }      from "./data/users.data.store";
import { GlobalViewStore } from "./view/global.view.store";

export class RootStore {
	todosStore: TodosStore;
	usersStore: UsersStore;
	globalViewStore: GlobalViewStore;

	constructor() {
		this.init();
	}

	init() {
		this.todosStore      = new TodosStore(this);
		this.usersStore      = new UsersStore(this);
		this.globalViewStore = new GlobalViewStore(this);
	}
}

export const rootStore = new RootStore();
