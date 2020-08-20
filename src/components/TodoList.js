import React from 'react';
import Todo from './Todo';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';


// import { red } from '@material-ui/core/colors';

// we destructure props into the syntax {todos}.
// props are sent to us from App.js


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const TodoList = ({ todos, setTodos }) => {
    const classes = useStyles();
    return (
        // data-testid gives the test a way to find the element I want to make assertions against 
        <div className={classes.root} data-testid="todo-list">
            {/* accessing the todos from the fetch, passed from the Todo component.  */}
            {/* <Grid container spacing={3}> */}
                {todos
                    .slice()
                    .sort((todo1, todo2) => {
                        return new Date(todo1.datecreated) - new Date(todo2.datecreated)
                    })
                    .map(todo =>
                        <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos}></Todo>
                    )}
            {/* </Grid> */}
        </div>
    )
}
// }

export default TodoList;
