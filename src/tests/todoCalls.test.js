// import React from 'react';
// import { updateTodo, addTodo, getTodos } from '../utils/todoCalls';
// import renderer from 'react-test-renderer';


import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const fetch = require("node-fetch");

let todo = { datecreated: "2020-08-06T13:56:00", description: "testing", id: 399, name: "a test to " }


let todos = [
    { datecreated: "2020-08-06T13:56:00", description: "testing", id: 399, name: "a test test the jesting" },
    { datecreated: "2020-08-06T14:29:00", description: "testing2", id: 400, name: "a test to test testing" },
    { datecreated: "2020-08-06T15:10:00", description: "testing3", id: 401, name: "a test to jest the jesting" }
]


let updatedName = "an updated title of a task"
let updatedDescription = "an updated description of a task"


test ('throws error if false', () =>{
    expect(todos).not.toBeNull();
})
// test('throws an error if empty object', () => {
//     fetch.mockResponseOnce(JSON.stringify({ todos }));
//     const onResponse = jest.fn();
//     const onError = jest.fn();

//     return getTodos()
//         .then(onResponse)
//         .catch(onError)
//         .finally(()=>{
//             expect(onResponse).not.toHaveBeenCalled();
//             expect(onError).toHaveBeenCalled();
//         })
// })