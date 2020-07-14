import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// we destructure props into the syntax {friends}.
// props are sent to us from App.js

const TodoList = ({ todos, setTodos }) => {
    const [updateTodo, setUpdateTodo] = useState("")
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
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
        avatar: {
            backgroundColor: red[500],
        },
    }));
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const classes = useStyles();

    return (
        <div>
            <ul>
                {todos.map(todo => 
                    <div key={todo.name}>
                        {todo.name}
                    </div>   
                
                
                )}

                {/* {friends.todo.map(friend =>
                        <div>
                            <Card className={classes.root}>
                                <div>
                                    <CardHeader title={friend} subheader={friends[friend]}>
                                    </CardHeader>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
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
                                        <div>
                                            <button onClick={() => {
                                                const requestOptions = {
                                                    method: 'DELETE',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ "title": friend })
                                                };
                                                fetch(`/api/delete`, requestOptions)
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        /// destructuring the name, take out the 1 firend and omit it. 
                                                        // return the rest.
                                                        const { [friend]: omit, ...rest } = friends
                                                        setFriends(rest)
                                                    });
                                            }}> Delete</button>
                                            <button onClick={() => {
                                                const requestOptions = {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ newName: updateFriend })
                                                };
                                                if (updateFriend) {
                                                    fetch(`/api/update/${friend}`, requestOptions)
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            const { [friend]: _, ...rest } = friends
                                                            setFriends({
                                                                ...rest,
                                                                [`${updateFriend}`]: friends[friend]
                                                            })
                                                        })
                                                } else {
                                                    alert("Please enter a title/name")
                                                }
                                            }}>
                                                Update
                                </button>
                                            <input type="text" name="newName" onChange={(event) => {
                                                setUpdateFriend(event.target.value)
                                            }}></input>
                                        </div>
                                    </Collapse>
                                </div>
                            </Card>
                        </div>
                    )} */}

            </ul>
        </div >
    )
}
// }

export default TodoList;
