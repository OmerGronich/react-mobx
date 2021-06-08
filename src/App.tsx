import React, { DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react';
import './App.css';
import { observer }                                                           from "mobx-react-lite";
import { RootStore }                                                          from "./stores/root.store";
import { Todo as TodoEntity }                                                 from "./stores/data/entity/todo.entity";
import { TodoFilterOptions }                                                  from "./stores/view/global.view.store";

interface ITodoProps {
	todo: TodoEntity;
}

const Todo: React.FC<ITodoProps> = ({todo}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [todoTitle, setTodoTitle] = useState(todo.title);


	const handleClick = () => {
		todo.destroy();
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodoTitle(e.target.value);
	};


	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			todo.edit(todoTitle);
			setIsEditing(false);
		}
	};

	return (<li key={todo.id} className={`${isEditing ? 'editing' : ''}`} onDoubleClick={() => setIsEditing(true)}>
		<div className="view">
			<input type="checkbox" className="toggle"/>
			<label key={todo.id}>{todo.title}</label>
			<button className="destroy" onClick={handleClick}/>
		</div>
		{isEditing && <input autoFocus className="edit" value={todoTitle} onChange={onChange}
                             onKeyDown={onKeyDown}/>}
	</li>);
};

const App = observer(({store}: { store: RootStore }) => {

	const [todoTitle, setTodoTitle] = useState('');

	// @ts-ignore
	window.store = store;

	useEffect(() => {
		store.todosStore.getItems();
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
						<input className="new-todo" placeholder="What needs to be done?" autoFocus
							   value={todoTitle}
							   onChange={onChange}
							   onKeyDown={onKeyDown}
						/>
					</header>
					<section className="main">
						<input
							id="toggle-all"
							className="toggle-all"
							type="checkbox"

						/>
						<label htmlFor="toggle-all">Mark all as complete</label>
						<ul className="todo-list">
							{store.todosStore.filteredTodos.map(todo => <Todo key={todo.id} todo={todo}/>)}
						</ul>
					</section>
					<footer className="footer">
						<span className="todo-count"></span>
						<ul className="filters">
							{
								Object.keys(TodoFilterOptions).map((filter) => {
									const todoFilterValue = TodoFilterOptions[filter as keyof typeof TodoFilterOptions];

									return (
										<li
											key={filter}
											onClick={() => store.globalViewStore.setCurrentFilter(todoFilterValue)}
										>
											<a href="#/"
											   className={store.globalViewStore.currentTodoFilter === todoFilterValue ? 'selected' : ''}
											>
												{todoFilterValue}
											</a>
										</li>
									);
								})
							}
						</ul>
						<button className="clear-completed">Clear completed</button>
					</footer>
				</section>
			}
		</div>
	);
});

export default App;
