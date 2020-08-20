
const getTodos = (cb) => {
    fetch('/api/todos')
        .then(res => res.json())
        .then(data => {
            cb(data)
        })
}
const addTodo = (newTodo, newDescription, cb) => {
    const addOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTodo, description: newDescription })
    };
    if (newTodo.trim() === "") {
        alert("Input cannot be empty")
        return;
    } else {
        fetch('/api/add', addOptions)
            .then(response => response.json())
            .then(data => {
                cb(data)
            })
    }
}

const updateTodo = (todoId, updatedName, updatedDescription, cb) => {
    const updateOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: updatedName, newDescription: updatedDescription })
    };

    fetch(`/api/update/${todoId}`, updateOptions)
        .then(response => response.json())
        .then(data => {
            cb(data)
        })
}

const deleteTodo = (todoId, cb) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: todoId})
    };
    fetch(`/api/delete`, requestOptions)
        .then(response => response.json())
        .then(data => {
            cb(data)
            // // This does the same thing as above, except we only want the resultant list.
            // // If the element is equal todo.id, we don't want to keep it. (It's the delete function.)
            // // We do this because we cannot actually mutate todos (it's immutable). So we create a new list "rest", 
            // // which represents the "rest of the todos".
            // const rest = todos.filter(filterTodo => filterTodo.id !== todo.id)
            // setTodos(rest)
        });
}


export {
    deleteTodo,
    addTodo,
    updateTodo,
    getTodos
}