import React, { useState, useEffect } from 'react';


// we destructure props into the syntax {friends}.
// props are sent to us from App.js

const TodoList = ({ friends, id, setFriends }) => {
    const [updateFriend, setUpdateFriend] = useState("")
    return (
        <div>
            <ul>
                <h1>{id}</h1>
                {Object.keys(friends).map(friend =>
                    <div>
                        <li key={friend}>{friend}: {friends[friend]}</li>
                        <button onClick={() => {
                            // console.log(";laksjdf;lakjsdf;lkasdjf",{ [friend]: friends[friend] })
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
                        <input type="text" name="newName" onChange={(event) => {
                            setUpdateFriend(event.target.value)
                        }}></input>
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
                            } else{
                                alert("Please enter a title/name")
                            }
                        }}>
                            Update
                        </button>
                    </div>
                )}

            </ul>
        </div>
    )

}

export default TodoList;
