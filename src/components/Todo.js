import React, { useState, useRef } from 'react';

const Todo = ({ todo, todos, setTodos }) => {
    const updateInput = useRef(null);

    return <div key={todo.id}>
        {todo.name}
        <button onClick={() => {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName: updateInput.current.value })
            };
            if (updateInput.current.value) {
                fetch(`/api/update/${todo.id}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        // filterTodo => ... is similar to a map function, such that we are passing in our 
                        // todos in the "todo.filter", and it checks each individual todo (filterTodo) in todos.
                        // This says "keep the element in filterEDTodos if it's id is not equal todo.id (the one we're trying to remove)", 
                        // same logic goes for Delete
                        const filteredTodos = todos.filter(filterTodo => filterTodo.id != todo.id);
                        // console.log("TODO: ", todo)
                        // console.log("FILTERED TODOS: ", filteredTodos)
                        const updatedTodo = { ...todo, name: updateInput.current.value }
                        // console.log("UPDATED TODO: ", updatedTodo)
                        setTodos([
                            ...filteredTodos,
                            updatedTodo
                        ])
                    })
            } else {
                alert("Please enter a title/name")
            }
        }}>
            Update
        </button>
        <input ref={updateInput} type="text" name="newName"></input>
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
                    const rest = todos.filter(filterTodo => filterTodo.id != todo.id)
                    setTodos(rest)
                });
        }}> Delete</button>
    </div>

}


export default Todo;