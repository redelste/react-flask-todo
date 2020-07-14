import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'
import addTodo from './utils/todoCalls';
import './App.css';
import { Card, Collapse, makeStyles, Grid, Paper } from '@material-ui/core';




function App() {
  //  Always initialize state to the same data type as what we're going to fill it with
  //  friends is a dict, and set friends sets the state of this component to contain friends.
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [newAge, setNewAge] = useState(0)
  const [newDescription, setNewDescription] = useState("")
  useEffect(() => {
    fetch('/api/todos').then(res => res.json()).then(data => {
      setTodos(data.todos)
    })


  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }))
  return (
    <div className="App">
      
      <h1> Todo List </h1>
      <input type="text" placeholder="title" name="name" value={newTodo} onChange={(event) => {
        setNewTodo(event.target.value)
      }} />
      <input type="number" placeholder="age" name="age" value={newAge} onChange={(event) => {
        setNewAge(event.target.value)
      }}></input>
      <input type="text" placeholder="description" name="description" value={newDescription} onChange={(event)=>{
        setNewDescription(event.target.value)
      }}></input>
      <button onClick={() =>
        addTodo(newTodo, newAge, newDescription, (data) => {
          if (newTodo) {
            setTodos([
              ...todos,
              {name:newTodo, age:newAge, description:newDescription}
            ])
          } else {
            alert("Please enter a name/title")
          }
        })

      }>
        Submit
      </button>
      <TodoList todos={todos} setTodos={setTodos}></TodoList>

    </div >
  );
}

export default App;
