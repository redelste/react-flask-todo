import React, { useState, useEffect, useRef } from 'react';
import TodoList from './components/TodoList'
import { addTodo, getTodos } from './utils/todoCalls';
import { Typography, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { statuses } from './components/Todo'
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';



import './App.css';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  centered: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));
const TodoTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#FFFFFF',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FFFFFF',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: '#FFFFFF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFFFFF',
      },
    },
  }
})(TextField);





const handleSubmit = (e, setTodos, todos, newTodo, newDescription) => {
  e.preventDefault();
  if (newTodo) {
    addTodo(newTodo.current.value, newDescription.current.value, (data) => {
      console.log(data)
      setTodos([
        ...todos,
        {
          id: data.id,
          datecreated: data.datecreated,
          name: newTodo.current.value,
          description: newDescription.current.value,
          status: data.status
        }
      ])
      newTodo.current.value = "";
      newDescription.current.value = "";
    })

  }

}

function App() {
  //  Always initialize state to the same data type as what we're going to fill it with
  //  todos is a list, and set Todos sets the state of this component to contain a list of todos.
  const [todos, setTodos] = useState([])
  // const [newTodo, setNewTodo] = useState("")
  // const [newDescription, setNewDescription] = useState("")
  const titleInput = useRef(null)
  const descriptionInput = useRef(null)

  const classes = useStyles();


  useEffect(() => {
    getTodos((data) => {
      setTodos(data.todos)
    })
  }, []);




  const descriptionInputProps = {
    name: "description",
    ref: descriptionInput
  }

  const titleInputProps = {
    name: "title",
    ref: titleInput
  }
  return (

    <div className={classes.colors}>
      <form onSubmit={(e) => handleSubmit(e, setTodos, todos, titleInput, descriptionInput)} className={classes.centered}>
        <Typography variant='h4' align='center' gutterBottom>
          Todo List
        </Typography>
        <Grid container spacing={3} justify="center">

          <TodoTextField
            className={classes.textField}
            helperText="Enter a title for your Todo-Task"
            label="Title"
            inputProps={titleInputProps}
          />
          <TodoTextField
            className={classes.textField}
            helperText="Enter a description for your Todo-Task"
            id="standard-basic"
            label="Description"
            inputProps={descriptionInputProps}
          ></TodoTextField>
          <Button type='submit' color='inherit' variant='outlined' size='small'>
            Submit
        </Button>
        </Grid>
      </form>
      <Grid container spacing={3} justify="center" className={classes.colors}>
        <Grid item xs={6} sm={3}>
          <Typography variant='h6' align='center' gutterBottom>
            New Todos
          </Typography>
          <TodoList todos={todos.filter(todo =>
            todo.status === statuses.TODO
          )} setTodos={setTodos}></TodoList>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant='h6' align='center' gutterBottom>
            In Progress Todos
          </Typography>
          <TodoList todos={todos.filter(todo =>
            todo.status === statuses.IN_PROGRESS
          )} setTodos={setTodos}></TodoList>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant='h6' align='center' gutterBottom>
            Completed Todos
          </Typography>
          <TodoList todos={todos.filter(todo =>
            todo.status === statuses.COMPLETED
          )} setTodos={setTodos}></TodoList>        </Grid>
      </Grid>

    </div>
  );
}

export default App;
