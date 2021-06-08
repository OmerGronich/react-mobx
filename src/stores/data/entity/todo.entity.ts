import { TodosStore }         from "../todos.data.store";
import { makeAutoObservable } from "mobx";

export class Todo {
	userId: number;
	id: number;
	completed: boolean;

	constructor(public store: TodosStore, public title: string = '', id: number = Date.now()) {
		this.id        = id;
		this.completed = false;
		this.userId    = this.store.root.usersStore.currentUser?.id || Date.now();

		makeAutoObservable(this);
	}


	destroy() {
		this.store.deleteTodo(this);
	}

	toggleCompleted() {
		this.completed = !this.completed;
	}

	edit(todoTitle: string) {
		this.title = todoTitle;
	}
}
