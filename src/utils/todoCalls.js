

export const addTodo = (newTodo, newDescription, cb) => {
    console.log(newTodo, newDescription)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTodo, description: newDescription })
    };
    if (newTodo.trim() === "") {
        alert("Input cannot be empty")
        return;
    } else {
        fetch('/api/add', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("DATA", data)
                cb(data)
            }
            )
    }
}

export default addTodo;