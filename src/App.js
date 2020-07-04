import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'
import './App.css';


const computeFriendsLength = (d) => Object.keys(d).length;


function App() {
  //  Always initialize state to the same data type as what we're going to fill it with
  //  friends is a dict, and set friends sets the state of this component to contain friends.
  const [friends, setFriends] = useState({})
  const [newFriend, setNewFriend] = useState("")
  const [newAge, setNewAge] = useState(0)
  useEffect(() => {
    fetch('/api/postgres').then(res => res.json()).then(data => {
      console.log(data);
      setFriends(data)
    })


  }, []);
  return (
    <div className="App">
      <TodoList friends={friends} id={computeFriendsLength(friends)} setFriends={setFriends}></TodoList>

      <input type="text" name="name" value={newFriend} onChange={(event) => {
        setNewFriend(event.target.value)
      }} />
      <input type="number" name="age" value={newAge} onChange={(event) => {
        setNewAge(event.target.value)
      }}></input>
      <button onClick={() => {

        console.log(newFriend, newAge)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newFriend, age: newAge })
        };
        fetch('/api/add', requestOptions)
          .then(response => response.json())
          .then(data => setFriends({
            // spread = "..."
            // it unpacks the dictionary 
            // must spread a dict into another type of container

            //  what this looks like is:
            /*
            {
              ...{"ham": 303}, "newName": newAge
            }

            We are taking all values in the original ham dict, and combining it with
            our new name, age pair into a single dict. 
            we do this because of immutability.
            Dont want to mutate things, only create new thingss
            */
            ...friends,
            [`${data.name}`]: data.age
          })
          )
      }}>
        Submit
      </button>

    </div >
  );
}

export default App;
 