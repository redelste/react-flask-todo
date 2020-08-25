import React, { useState, useEffect, useRef } from 'react';
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
          iscompleted: data.isCompleted
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* I know... this looks ridiculous */}
          <form onSubmit={(e) => handleSubmit(e, setTodos, todos, titleInput, descriptionInput)} className={classes.centered}>
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
