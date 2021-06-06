import { Todo } from "../stores/data/entity/todo.entity";

export class TodosAdapter {
	async getItems<T = Todo[]>(): Promise<T> {
		return (await fetch('https://jsonplaceholder.typicode.com/todos')).json();
	}
}
