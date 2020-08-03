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
        <div className={classes.root}>
            {/* accessing the todos from the fetch, passed from the Todo component.  */}
            <Grid container spacing={3}>

                {todos
                    .slice()
                    .sort((todo1, todo2) => {
                        return new Date(todo1.datecreated) - new Date(todo2.datecreated)
                    })
                    .map(todo =>
                        <Grid item xs={4}
                            key={todo.id}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos}></Todo>
                        </Grid>
                    )}

            </Grid>
        </div>
    )
}
// }

export default TodoList;
