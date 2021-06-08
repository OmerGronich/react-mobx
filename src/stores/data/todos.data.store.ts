import { RootStore }                       from "../root.store";
import { Todo }                            from "./entity/todo.entity";
import { makeAutoObservable, runInAction } from "mobx";
import { IDataStore }                      from "./type/data-store.interface";
import { TodosAdapter }                    from "../../adapters/todos.adapter";
import { TodoFilterOptions }               from "../view/global.view.store";

export class TodosStore implements IDataStore {
	todos: Todo[];
	todosAdapter: TodosAdapter;

	get filteredTodos() {
		if (this.root.globalViewStore.currentFilter === TodoFilterOptions.COMPLETED) {
			return this.todos.filter(todo => todo.completed);
		} else if (this.root.globalViewStore.currentFilter === TodoFilterOptions.ACTIVE) {
			return this.todos.filter(todo => !todo.completed);
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

	async loadItems() {
		this.root.globalViewStore.loading = true;
		const todos                       = (await this.todosAdapter.getItems())
			.slice(0, 5)
			.map(todo => new Todo(this, todo.title, todo.id));

		runInAction(() => {
			this.todos                        = todos;
			this.root.globalViewStore.loading = false;
		});
	}


	addTodo(todoTitle: string) {
		const todo: Todo = new Todo(this, todoTitle);
		this.todos.push(todo);
	}

	deleteTodo(todo: Todo) {
		this.todos.splice(this.todos.findIndex(t => t.id === todo.id), 1);
	}
}
