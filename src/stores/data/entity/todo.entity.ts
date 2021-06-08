import { TodosStore } from "../todos.data.store";

export class Todo {
	userId: number;
	id: number;
	completed: boolean;

	constructor(public store: TodosStore, public title: string = '', id: number = Date.now()) {
		this.id        = id;
		this.completed = false;
		this.userId    = this.store.root.usersStore.currentUser?.id || Date.now();
	}

	destroy() {
		this.store.deleteTodo(this);
	}

	edit(title: string) {
		this.store.editTodo(this, title);
	}

}
