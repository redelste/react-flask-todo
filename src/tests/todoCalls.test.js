// import React from 'react';
import { updateTodo, addTodo, getTodos, deleteTodo } from '../utils/todoCalls';
// import renderer from 'react-test-renderer';


import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();


let todo = { datecreated: "2020-08-06T13:56:00", description: "testing", id: 399, name: "a test to " }


let todos = [
    { datecreated: "2020-08-06T13:56:00", description: "testing", id: 399, name: "a test test the jesting" },
    { datecreated: "2020-08-06T14:29:00", description: "testing2", id: 400, name: "a test to test testing" },
    { datecreated: "2020-08-06T15:10:00", description: "testing3", id: 401, name: "a test to jest the jesting" }
]


let updatedName = "an updated title of a task"
let updatedDescription = "an updated description of a task"


test('throws error if false', () => {
    expect(todos).not.toBeNull();
})

describe('testing our API Calls', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('supplies a list of todos to a callback when getTodos is called', () => {
        fetch.mockResponseOnce(JSON.stringify(todos));
        getTodos(listOftodos => {
            expect(listOftodos.length).toEqual(3)
        })
    })
    // add
    it('adds a new todo to the list of todos', () => {
        fetch.mockResponseOnce(JSON.stringify({ id: 3, datecreated: new Date(), name: "greg", description: "heffley" }))
        addTodo("greg", "heffley", singleTodo => {
            expect(singleTodo.id).toEqual(3)
            expect(singleTodo.name).toEqual("greg")
            expect(singleTodo.description).toEqual("heffley")
        })
    })
    // update
    it('updates a todo in the list', () => {
        fetch.mockResponseOnce(JSON.stringify({ "success": true }))
        updateTodo(4, "Gregory", "Hefflye", updatedTodo => {
            expect(updatedTodo.success).toEqual(true)
        })
    })
    it('changes nothing if the backend return bad success value', () => {
        fetch.mockResponseOnce(JSON.stringify({ "success": false }))
        updateTodo(5, "", "Hefflye", updatedTodo => {
            expect(updatedTodo.success).toEqual(false)
        })
    })
    // delete
    it('removes a todo item from the list of todos', () => {
        fetch.mockResponseOnce(JSON.stringify({ "success": true, id: 100 }))
        deleteTodo(100, res => {
            expect(res.success).toEqual(true)
            expect(res.id).toEqual(100)
        })
    })

})