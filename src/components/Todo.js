import React, { useRef } from 'react';
import { updateName, updateDescription } from '../utils/todoCalls'
const Todo = ({ todo, todos, setTodos }) => {
    const updateNameInput = useRef(null);
    const updateDescriptionInput = useRef(null);


    const handleSubmit = (e, updateNameInput, updateDescriptionInput) => {
        e.preventDefault();
        if (updateNameInput.current.value) {
            updateName(todo.id, updateNameInput.current.value, (data) => {

                // state management --> need to refactor for redux
                const filteredTodos = todos.filter(filterTodo => filterTodo.id !== todo.id);
                const updatedTodo = { ...todo, name: updateNameInput.current.value }
                setTodos([
                    ...filteredTodos,
                    updatedTodo
                ])
                updateNameInput.current.value = "";
            })
        }

        if (updateDescriptionInput.current.value) {
            updateDescription(todo.id, updateDescriptionInput.current.value, (data) => {
                const filteredTodos = todos.filter(filterTodo => filterTodo.id !== todo.id);
                const updatedDescription = { ...todo, description: updateDescriptionInput.current.value }
                setTodos([
                    ...filteredTodos,
                    updatedDescription
                ])
                updateDescriptionInput.current.value = "";
            })
        }
    }

    return <div key={todo.id}>
        {todo.name} : {todo.description}

        <form onSubmit={(e) => handleSubmit(e, updateNameInput, updateDescriptionInput)}>
            <button type="submit">
                Update Title
            </button>
            <input ref={updateNameInput} type="text" name="newName"></input>
            <button>
                Update Description
            </button>
            <input ref={updateDescriptionInput} type="text" name="newDescription"></input>
            <button onClick={() => {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: todo.id })
                };
                fetch(`/api/delete`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        // This does the same thing as above, except we only want the resultant list.
                        // If the element is equal todo.id, we don't want to keep it. (It's the delete function.)
                        // We do this because we cannot actually mutate todos (it's immutable). So we create a new list "rest", 
                        // which represents the "rest of the todos".
                        const rest = todos.filter(filterTodo => filterTodo.id !== todo.id)
                        setTodos(rest)
                    });
            }}> Delete</button>

        </form>
    </div>

}


export default Todo;