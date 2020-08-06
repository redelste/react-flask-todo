import React, { useRef } from 'react';
import { updateTodo } from '../utils/todoCalls'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        height: "100%"
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: 3
    },
    divider: {
        margin: `10px`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },

});


const Todo = ({ todo, todos, setTodos }) => {
    const updateNameInput = useRef(null);
    const updateDescriptionInput = useRef(null);
    const classes = useStyles();

    const handleSubmit = (e, updateNameInput, updateDescriptionInput) => {
        e.preventDefault();
        updateTodo(todo.id, updateNameInput.current.value, updateDescriptionInput.current.value, (data) => {
            // state management --> need to refactor for redux
            const filteredTodos = todos.filter(filterTodo => filterTodo.id !== todo.id);
            const updatedTodo = {
                ...todo,
                name: updateNameInput.current.value || todo.name,
                description: updateDescriptionInput.current.value || todo.description
            }
            setTodos([
                ...filteredTodos,
                updatedTodo
            ])
            if (updateNameInput.current.value !== "" || updateNameInput.current.value !== null) {
                updateNameInput.current.value = "";
            }
            if (updateDescriptionInput.current.value !== "" || updateDescriptionInput.current.value !== null) {
                updateDescriptionInput.current.value = "";
            }
        })

    }

    return <div key={todo.id} className={classes}>
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={
                    "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                }
            />
            <CardContent className={classes.content}>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                >
                    {todo.name}
                </Typography>
                <Divider className={classes.divider} light />
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"caption"}
                    gutterBottom
                >
                    {todo.datecreated}
                </Typography>
                <Typography
                    className={"MuiTypography--subheading"}
                    variant={"caption"}
                >
                    <Divider className={classes.divider} light />
                    {todo.description}
                    <form onSubmit={(e) => handleSubmit(e, updateNameInput, updateDescriptionInput)}>
                        <button type="submit">
                            Update
                        </button>
                        <input ref={updateNameInput} type="text" name="newName"></input>
                        <input ref={updateDescriptionInput} type="text" name="newDescription"></input>
                    </form>
                    <button onClick={() => {
                        const requestOptions = {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: todo.id })
                        };
                        fetch(`/api/delete`, requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                // This does the same thing as above, except we only want the resultant list.
                                // If the element is equal todo.id, we don't want to keep it. (It's the delete function.)
                                // We do this because we cannot actually mutate todos (it's immutable). So we create a new list "rest", 
                                // which represents the "rest of the todos".
                                const rest = todos.filter(filterTodo => filterTodo.id !== todo.id)
                                setTodos(rest)
                            });
                    }}> Delete</button>
                </Typography>
            </CardContent>
        </Card>
    </div>

}


export default Todo;