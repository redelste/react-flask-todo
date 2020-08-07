import React from 'react';
import  Todo  from "../components/Todo";
import renderer from 'react-test-renderer';

let todo = {datecreated:"2020-08-06T13:56:00", description:"testing", id: 399, name: "a test to "}


let todos =[
    {datecreated:"2020-08-06T13:56:00", description:"testing", id: 399, name: "a test test the jesting"},
    {datecreated:"2020-08-06T14:29:00", description:"testing2", id: 400, name: "a test to test testing"},
    {datecreated:"2020-08-06T15:10:00", description:"testing3", id: 401, name: "a test to jest the jesting"}
]
test('Each todo renders correctly', ()=>{
    const component = renderer.create(<Todo todo={todo} todos={todos}/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

//  Should be updated in the future to handle axios.
// describe('testing the api functionality through fetch simulation', () =>{
//     it('should add a todo when invoked', ()=>{
//         const wrapper = shallow(<Todo todo={}/>)
//     })
// })