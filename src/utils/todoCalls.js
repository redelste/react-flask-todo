
const makeRequest = (endpoint, req, cb) => {
    fetch(endpoint, req).then(res => res.json()).then(data => cb(data))
}


const getTodos = (cb) => {
    makeRequest("/api/todos", {}, cb)
}
const addTodo = (newTodo, newDescription, cb) => {
    const addOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTodo, description: newDescription})
    };
    if (newTodo.trim() === "") {
        alert("Input cannot be empty")
        return;
    } else {
        makeRequest('/api/add', addOptions, cb)
    }
}

const updateTodo = (todoId, updatedName, updatedDescription, cb) => {
    const updateOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: updatedName, newDescription: updatedDescription })
    };
    makeRequest(`/api/update/${todoId}`, updateOptions, cb)
}

const updateStatus = (todoId, newStatus, cb) =>{
    const statusOptions = {
        method: 'PUT', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({status: newStatus})
    }
    makeRequest(`/api/update/status/${todoId}`, statusOptions, cb)
}

const deleteTodo = (todoId, cb) => {
    const deleteOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: todoId })
    };
    makeRequest(`/api/delete`, deleteOptions, cb)
}


export {
    deleteTodo,
    addTodo,
    updateTodo,
    getTodos,
    updateStatus
}