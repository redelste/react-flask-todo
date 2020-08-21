import React from 'react';
import Todo from "../components/Todo";
import { screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';

let todo = { datecreated: "2020-08-06T13:56:00", description: "testing", id: 399, name: "a test to " }


let todos = [
    { datecreated: "2020-08-06T13:56:00", description: "testing1", id: 399, name: "a test test the jesting" },
    { datecreated: "2020-08-06T14:29:00", description: "testing2", id: 400, name: "a test to test testing" },
    { datecreated: "2020-08-06T15:10:00", description: "testing3", id: 401, name: "a test to jest the jesting" }
]

test('Each todo renders correctly', () => {
    const component = renderer.create(<Todo todo={todo} todos={todos} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})


test('I ensure the Todo contains the correct content as described', ()=>{
    render(<Todo todo={todo}></Todo>)
    const element = screen.getByTestId('single-todo')
    expect(element).toHaveTextContent("testing")
})


