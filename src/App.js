import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'
import { addTodo, getTodos } from './utils/todoCalls';
import { Typography, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

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





const handleSubmit = (e, setTodos, setNewTodo, setNewDescription, todos, newTodo, newDescription) => {
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

function App() {
  //  Always initialize state to the same data type as what we're going to fill it with
  //  todos is a list, and set Todos sets the state of this component to contain a list of todos.
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [newDescription, setNewDescription] = useState("")

  const classes = useStyles();


  useEffect(() => {
    getTodos((data) => {
      setTodos(data.todos)
    })
  }, []);




  const descriptionInputProps = {
    value: newDescription,
    name: "description",
    onChange: (event) => {
      setNewDescription(event.target.value)
    }
  }

  const titleInputProps = {
    value: newTodo,
    name: "title",
    onChange: (event) => {
      setNewTodo(event.target.value)
    }
  }
  return (
    <div className={classes.colors}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* I know... this looks ridiculous */}
          <form onSubmit={(e) => handleSubmit(e, setTodos, setNewTodo, setNewDescription, todos, newTodo, newDescription)} className={classes.centered}>
            <Typography variant='h4' align='center' gutterBottom>
              Todo List
            </Typography>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center">
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
        </Grid>
        <TodoList todos={todos} setTodos={setTodos}></TodoList>
      </Grid>
    </div>
  );
}

export default App;
