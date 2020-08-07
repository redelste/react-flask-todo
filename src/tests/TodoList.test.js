import React from 'react';
import  TodoList  from "../components/TodoList";
import renderer from 'react-test-renderer';

let todo = {datecreated:"2020-08-06T13:56:00", description:"testing", id: 399, name: "a test to "}


let todos =[
    {datecreated:"2020-08-06T13:56:00", description:"testing", id: 399, name: "a test test the jesting"},
    {datecreated:"2020-08-06T14:29:00", description:"testing2", id: 400, name: "a test to test testing"},
    {datecreated:"2020-08-06T15:10:00", description:"testing3", id: 401, name: "a test to jest the jesting"}
]
test('TodoList renders correctly', ()=>{
    const component = renderer.create(<TodoList todos={todos}/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})