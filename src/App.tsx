import React, { useEffect, useState } from 'react';
import './App.css';
import { observer }                   from "mobx-react-lite";
import { RootStore }                  from "./stores/root.store";
import Todo                           from "./components/Todo/Todo";
import { TodoFilterOptions }          from "./stores/view/global.view.store";
import { runInAction }                from "mobx";

const App = observer(({store}: { store: RootStore }) => {

	const [todoTitle, setTodoTitle] = useState('');

	// @ts-ignore
	window.store = store;

	useEffect(() => {
		store.todosStore.loadItems();
	}, []);

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			store.todosStore.addTodo(todoTitle);
			setTodoTitle('');
		}
	};
	const onChange  = (e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value);

	return (
		<div className="App">
			{
				store.globalViewStore.loading ? <div className="loading">loading...</div> :
				<section className="todoapp">
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							autoFocus
							value={todoTitle}
							onChange={onChange}
							onKeyDown={onKeyDown}
						/>
					</header>
					<section className="main">
						<input id="toggle-all" className="toggle-all" type="checkbox"/>
						<label htmlFor="toggle-all">Mark all as complete</label>
						<ul className="todo-list">
							{store.todosStore.filteredTodos.map(todo => (
								<Todo key={todo.id} todo={todo}/>
							))}
						</ul>
					</section>
					<footer className="footer">
						<span className="todo-count"></span>
						<ul className="filters">
							{Object.keys(TodoFilterOptions).map(filter => {
								const todoFilterOption = TodoFilterOptions[filter as keyof typeof TodoFilterOptions];
								return (
									<li
										key={filter}
									>
										<a
											className={`${store.globalViewStore.currentFilter === todoFilterOption ? 'selected' : ''}`}
											onClick={() => {
												store.globalViewStore.setCurrentFilter(todoFilterOption);
											}}
										>
											{todoFilterOption}
										</a>
									</li>
								);
							})}
						</ul>
						<button className="clear-completed">Clear completed</button>
					</footer>
				</section>
			}
		</div>
	);
});

export default App;
