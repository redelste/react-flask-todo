import React from 'react';
import Todo from './Todo';

import { makeStyles } from '@material-ui/core/styles';


import Draggable from 'react-draggable'; // Both at the same time
import FlipMove from 'react-flip-move';
// import { red } from '@material-ui/core/colors';

// we destructure props into the syntax {todos}.
// props are sent to us from App.js


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const TodoList = ({ todos, setTodos, status }) => {
    const classes = useStyles();
    return (
        // data-testid gives the test a way to find the element I want to make assertions against 
        <div className={classes.root} data-testid="todo-list">
            {/* accessing the todos from the fetch, passed from the Todo component.  */}
            <FlipMove>
                {todos
                    .filter(todo => todo.status === status)
                    .sort((todo1, todo2) => {
                        return todo1.id - todo2.id
                    })
                    .map(todo =>
                        <Draggable
                            defaultPosition={{ x: 0, y: 0 }}
                            position={null}
                            scale={1}>
                            <div>
                                {/* passing props into Todo component. Todos is a list of todos. setTodos is the current state.                            */}
                                <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos}></Todo>
                            </div>
                        </Draggable>
                    )}
            </FlipMove>


        </div>
    )
}
// }

export default TodoList;
