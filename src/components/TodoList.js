import React, { useState, useRef } from 'react';
import Todo from './Todo';
import { makeStyles } from '@material-ui/core/styles';


import { red } from '@material-ui/core/colors';

// we destructure props into the syntax {todos}.
// props are sent to us from App.js

const TodoList = ({ todos, setTodos }) => {
    return (
        <div>
            <ul>
                {/* accessing the todos from the fetch, passed from the Todo component.  */}
                {todos
                    .slice()
                    .sort((todo1, todo2) => {
                        console.log("sorting", todo1)
                        return new Date(todo1.datecreated) - new Date(todo2.datecreated)
                    })
                    .map(todo => 
                    <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos}></Todo>
                )}
            </ul>
        </div >
    )
}
// }

export default TodoList;
