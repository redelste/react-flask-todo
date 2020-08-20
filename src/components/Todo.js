import React, { useRef } from 'react';
import { updateTodo, deleteTodo } from '../utils/todoCalls'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CancelIcon from '@material-ui/icons/Cancel';
import { TextField } from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: "20%",
        maxHeight: "10%",
        margin: "20px auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        height: "100%",
        padding: "20px"

    },

    content: {
        textAlign: "left",
        padding: 3,
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
    shapeCircle: {

        borderRadius: '50%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    cancelIcon: {
        justifyContent: "right"
    }
}));
const UpdateTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#000000',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#350908',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    }
})(TextField);

const Todo = ({ todo, todos, setTodos }) => {
    const updateNameInput = useRef(null);
    const updateDescriptionInput = useRef(null);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


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

    const updateTitleInputProps = {
        name: "newName",
        ref: updateNameInput
    }

    const updateDescriptionInputProps = {
        name: "newDescription",
        ref: updateDescriptionInput
    }

    return <div key={todo.id} className={classes}>
        <Card className={classes.card}>
            <CancelIcon className={classes.cancelIcon} onClick={() => {
                deleteTodo(todo.id, (data) => {
                    // we only want the resultant list.
                    // If the element is equal todo.id, we don't want to keep it. (It's the delete function.)
                    // We do this because we cannot actually mutate todos (it's immutable). So we create a new list "rest", 
                    // which represents the "rest of the todos".
                    const rest = todos.filter(filterTodo => filterTodo.id !== todo.id)
                    setTodos(rest)
                })
            }}>
            </CancelIcon>
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

                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {todo.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography>
                    Update
                </Typography>
                <CardContent>
                    <form onSubmit={(e) => handleSubmit(e, updateNameInput, updateDescriptionInput)}>
                        <button type="submit" style={{ display: "none" }}>Update</button>
                        <UpdateTextField
                            type="text"
                            placeholder="Title"
                            inputProps={updateTitleInputProps}>
                        </UpdateTextField>
                        <UpdateTextField
                            placeholder="Description"
                            type="text"
                            inputProps={updateDescriptionInputProps}>
                        </UpdateTextField>
                    </form>

                </CardContent>
            </Collapse>
        </Card>
    </div >

}


export default Todo;