import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'
import { addTodo } from './utils/todoCalls';
import { Typography, TextField, Button } from '@material-ui/core'
// import { makeStyles, useTheme, ThemeProvider } from "@material-ui/styles";
// import SaveIcon from '@material-ui/icons/Save';
// import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';



import './App.css';


function App() {
  //  Always initialize state to the same data type as what we're going to fill it with
  //  todos is a list, and set Todos sets the state of this component to contain a list of todos.
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [newDescription, setNewDescription] = useState("")


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
  const classes = useStyles();


  useEffect(() => {
    fetch('/api/todos').then(res => res.json()).then(data => {
      setTodos(data.todos)
    })


  }, []);
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
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={(e) => handleSubmit(e, newTodo, newDescription, setTodos)} className={classes.centered}>
            <Typography variant='h4' align='center' gutterBottom>
              Todo List
            </Typography>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center">
              <TextField
                className={classes.textField}
                helperText="Enter a title for your Todo-Task"
                type="text" label="Title" name="name" value={newTodo} onChange={(event) => {
                  setNewTodo(event.target.value)
                }} />
              <TextField
                className={classes.textField}
                helperText="Enter a description for your Todo-Task"
                type="text" id="standard-basic" label="Description" name="description" value={newDescription} onChange={(event) => {
                  setNewDescription(event.target.value)
                }}></TextField>

              <Button type='submit' color='primary' variant='outlined' size='small'>
                Submit
            </Button>
            </Grid>
          </form>
        </Grid>
        <TodoList todos={todos} setTodos={setTodos}></TodoList>
      </Grid>
    </div >
  );
}

export default App;
