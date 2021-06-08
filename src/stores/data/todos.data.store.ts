import { IStore }                          from "../types/store.interface";
import { RootStore }                       from "../root.store";
import { Todo }                            from "./entity/todo.entity";
import { makeAutoObservable, runInAction } from "mobx";
import { TodosAdapter }                    from "../../adapters/todos.adapter";
import { TodoFilterOptions }               from "../view/global.view.store";

export class TodosStore implements IStore {
	todos: Todo[];
	todosAdapter: TodosAdapter;

	get filteredTodos() {
		if (this.root.globalViewStore.currentTodoFilter === TodoFilterOptions.ACTIVE) {
			return this.todos.filter(todo => !todo.completed);
		} else if (this.root.globalViewStore.currentTodoFilter === TodoFilterOptions.COMPLETED) {
			return this.todos.filter(todo => todo.completed);
		} else {
			return this.todos;
		}
	}

	constructor(public root: RootStore) {
		this.init();
		makeAutoObservable(this);
	}

	init() {
		this.todos        = [];
		this.todosAdapter = new TodosAdapter();
	}

	async getItems() {
		this.root.globalViewStore.loading = true;
		const todos                       = (await this.todosAdapter.getItems())
			.slice(0, 5)
			.map((todo) => new Todo(this, todo.title, todo.id));

		runInAction(() => {
			this.root.globalViewStore.loading = false;
			this.todos                        = todos;
		});
	}

	addTodo(title: string) {
		const newTodo = new Todo(this, title);
		this.todos.push(newTodo);
	}


	deleteTodo(todo: Todo) {
		this.todos.splice(this.todos.findIndex(t => t.id === todo.id), 1);
	}

	editTodo(todo: Todo, title: string) {
		todo.title = title;
	}
}
