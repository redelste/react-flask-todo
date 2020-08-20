import React from 'react';
import TodoList from "../components/TodoList";
import { screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';


let todo = { datecreated: "2020-08-06T13:56:00", description: "testing", id: 399, name: "a test to " }


let todos = [
    { datecreated: "2020-08-06T13:56:00", description: "testing1", id: 399, name: "a test test the jesting" },
    { datecreated: "2020-08-06T14:29:00", description: "testing2", id: 400, name: "a test to test testing" },
    { datecreated: "2020-08-06T15:10:00", description: "testing3", id: 401, name: "a test to jest the jesting" }
]

// Snapshot Test
test('TodoList renders correctly', () => {
    const component = renderer.create(<TodoList todos={todos} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})


//  DOM test
test('I get as many Todo elements as there are todos.', () => {
    render(<TodoList todos={todos} />)
    // The Screen gets the element that was rendered from line #26 (above) using its data-testid prop.
    // This prop is on 25 of TodoList.js
    const element = screen.getByTestId('todo-list')
    // The following statements are used to assert that the test data was rendered by the TodoList component.
    expect(element).toHaveTextContent("testing1")
    expect(element).toHaveTextContent("testing2")
    expect(element).toHaveTextContent("testing3")
})