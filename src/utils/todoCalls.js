

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



const updateName = (todoId, updatedName, cb) => {
    const updateOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: updatedName })
    };

    fetch(`/api/update/${todoId}`, updateOptions)
        .then(response => response.json())
        .then(data => {
            cb(data)
        })
}

const updateDescription = (todoId, updatedDescription, cb) => {
    const updateDescriptionOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newDescription: updatedDescription })
    };
    fetch(`/api/update/description/${todoId}`, updateDescriptionOptions)
        .then(response => response.json())
        .then(data => {
            cb(data)
        })

}


export {
    addTodo,
    updateName,
    updateDescription
}