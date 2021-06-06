import { TodosStore } from "../todos.data.store";

export class Todo {
	userId: number;
	id: number;
	completed: boolean;

	constructor(public store: TodosStore, public title: string = '') {
		this.id        = Date.now();
		this.completed = false;
		this.userId    = this.store.root.usersStore.currentUser.id;
	}


}
