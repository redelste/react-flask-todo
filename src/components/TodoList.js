import React from 'react';
import Todo from './Todo';

import { makeStyles } from '@material-ui/core/styles';


import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

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

            {todos
                .slice()
                .sort((todo1, todo2) => {
                    console.log(todo1)
                    return todo1.id - todo2.id

                })
                .map(todo =>
                    <Draggable
                        // axis="x"
                        // handle=".handle"
                        defaultPosition={{ x: 0, y: 0 }}
                        position={null}
                        // grid={[25, 25]}
                        scale={1}>
                        <div>
                            <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos}></Todo>

                        </div>
                    </Draggable>
                )}


        </div>
    )
}
// }

export default TodoList;
