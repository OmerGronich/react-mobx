import { RootStore } from '../root.store'
import { Todo } from './entity/todo.entity'
import { makeAutoObservable, runInAction } from 'mobx'
import { IDataStore } from './type/data-store.interface'
import { TodosAdapter } from '../../adapters/todos.adapter'
import { TodoFilterOptions } from '../view/global.view.store'

export class TodosStore implements IDataStore {
  todos: Todo[]
  todosAdapter: TodosAdapter

  get filteredTodos() {
    let todosToShow: Todo[] = this.todos

    //completed filters:
    if (
      this.root.globalViewStore.currentFilter === TodoFilterOptions.COMPLETED
    ) {
      todosToShow = todosToShow.filter((currTodo) => currTodo.completed)
    } else if (
      this.root.globalViewStore.currentFilter === TodoFilterOptions.ACTIVE
    ) {
      todosToShow = todosToShow.filter((currTodo) => !currTodo.completed)
    }

    // + search filter:
    todosToShow = todosToShow.filter(({ title }) =>
      title.includes(this.root.globalViewStore.currentSearch)
    )

    return todosToShow
  }

  constructor(public root: RootStore) {
    this.init()
    makeAutoObservable(this)
  }

  init() {
    this.todos = []
    this.todosAdapter = new TodosAdapter()
  }

  async loadItems() {
    this.root.globalViewStore.loading = true
    const todos = (await this.todosAdapter.getItems())
      .slice(0, 5)
      .map((todo) => new Todo(this, todo.title, todo.id))

    runInAction(() => {
      this.todos = todos
      this.root.globalViewStore.loading = false
    })
  }

  addTodo(todoTitle: string) {
    const todo: Todo = new Todo(this, todoTitle)
    this.todos.push(todo)
  }

  deleteTodo(todo: Todo) {
    this.todos.splice(
      this.todos.findIndex((t) => t.id === todo.id),
      1
    )
  }

  clearCompleted() {
    this.todos.forEach((currTodo) => currTodo.edit(currTodo.title, false))
  }
}
