import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'
import addTodo from './utils/todoCalls';
import './App.css';




function App() {
  //  Always initialize state to the same data type as what we're going to fill it with
  //  friends is a dict, and set friends sets the state of this component to contain friends.
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [newDescription, setNewDescription] = useState("")


  
  useEffect(() => {
    fetch('/api/todos').then(res => res.json()).then(data => {
      console.log(data.todos)
      setTodos(data.todos)
    })


  }, []);

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     flexGrow: 1,
  //   }
  // }))


  const handleSubmit = (e, newTodo, newDescription, setTodos) => {
    e.preventDefault();
    if (newTodo) {
      addTodo(newTodo, newDescription, (data) => {
        setTodos([
          ...todos,
          { id: data.id, datecreated: data.datecreated, name: newTodo, description: newDescription }
        ])
      })
      setNewTodo("");
      setNewDescription("");
    }

  }
  return (
    <div className="App">

      <h1> Todo List </h1>
      <form onSubmit={(e) => handleSubmit(e, newTodo, newDescription, setTodos)}>
        <label>
          Title:
          <input type="text" placeholder="title" name="name" value={newTodo} onChange={(event) => {
            setNewTodo(event.target.value)

          }} />
          Description:
          <input type="text" placeholder="description" name="description" value={newDescription} onChange={(event) => {
            setNewDescription(event.target.value)
          }}></input>
        </label>
        <button type="submit">
          Submit
      </button>
      </form>

      <TodoList todos={todos} setTodos={setTodos}></TodoList>

    </div >
  );
}

export default App;
