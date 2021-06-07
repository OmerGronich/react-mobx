import React, { useEffect } from 'react';
import './App.css';
import { observer }         from "mobx-react-lite";
import { RootStore }        from "./stores/root.store";

const App = observer(({store}: { store: RootStore }) => {
	
	// @ts-ignore
	window.store = store;

	useEffect(() => {
		store.init();
	}, []);

	return (
		<div className="App">
			{
				store.globalViewStore.loading ? <div className="loading">loading...</div> :
				<section className="todoapp">
					<header className="header">
						<h1>todos</h1>
						<input className="new-todo" placeholder="What needs to be done?" autoFocus/>
					</header>
					<section className="main">
						<input id="toggle-all" className="toggle-all" type="checkbox"/>
						<label htmlFor="toggle-all">Mark all as complete</label>
						<ul className="todo-list">
							{store.todosStore.todos.map(todo => (<li key={todo.id}>
								<div className="view">
									<input type="checkbox" className="toggle"/>
									<label key={todo.id}>{todo.title}</label>
									<button className="destroy"/>
								</div>
							</li>))}
						</ul>
					</section>
					<footer className="footer">
						<span className="todo-count"></span>
						<ul className="filters">
							<li>
								<a href="#/" className="selected">All</a>
							</li>
							<li>
								<a href="#/active">Active</a>
							</li>
							<li>
								<a href="#/completed">Completed</a>
							</li>
						</ul>
						<button className="clear-completed">Clear completed</button>
					</footer>
				</section>
			}
		</div>
	);
});

export default App;
