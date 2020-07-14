

export const addTodo = (newTodo, newAge, newDescription, cb) => {
    console.log(newTodo, newAge, newDescription)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTodo, age: newAge, description: newDescription })
    };
    fetch('/api/add', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("DATA", data)
            cb(data)
        }
            // setFriends({
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
            // ...friends,
            // [`${data.name}`]: data.age
        // })
        )
} 

export default addTodo;