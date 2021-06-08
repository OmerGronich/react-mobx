import React, { useState }    from 'react';
import { Todo as TodoEntity } from '../../stores/data/entity/todo.entity';
import { observer }           from "mobx-react-lite";

const Todo: React.FC<{ todo: TodoEntity }> = observer(({todo}) => {

	const [isEditing, setIsEditing] = useState(false);
	const [todoTitle, setTodoTitle] = useState(todo.title);

	const onChange  = (e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value);
	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			todo.edit(todoTitle);
			setIsEditing(false);
		}
	};


	return (
		<li
			className={`${todo.completed ? ' completed' : ''} ${isEditing ? ' editing' : ''}`}
		>
			<div className="view">
				<input type="checkbox" className="toggle"

					   onClick={() => todo.toggleCompleted()}
				/>
				<label key={todo.id} onDoubleClick={() => setIsEditing(true)}>{todo.title}</label>
				<button className="destroy" onClick={() => todo.destroy()}/>
			</div>
			{isEditing && <input
                className="edit"
                autoFocus
                value={todoTitle}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
			}
		</li>
	);
});

export default Todo;
