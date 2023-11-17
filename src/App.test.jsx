import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from './App';

const addTodos = (tasks) => {
  tasks.forEach((task) => {
    // Go to '/add-todo' route
    const goToAddNewTodoPage = screen.getByRole('button', { name: '+' });
    fireEvent.click(goToAddNewTodoPage);

    // Change input value to a new task
    const inputElement = screen.getByPlaceholderText(/Add new task/i);
    fireEvent.change(inputElement, { target: { value: task } });

    // Add new todo
    const addNewTodoBtn = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(addNewTodoBtn);
  });
};

describe('App', () => {
  test('render App component', () => {
    render(<App />);
  });
});

describe('App', () => {
  test('should add one new todo', () => {
    render(<App />);

    const goToAddNewTodoPage = screen.getByRole('button', { name: '+' });
    fireEvent.click(goToAddNewTodoPage);

    const inputElement = screen.getByPlaceholderText(/Add new task/i);
    fireEvent.change(inputElement, { target: { value: 'test' } });

    const addNewTodoBtn = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(addNewTodoBtn);

    const paragraphElement = screen.getByText(/test/i);

    expect(paragraphElement).toBeInTheDocument(); // test
  });

  test('should add multiple todos', () => {
    render(<App />);

    // add 3 todos
    addTodos(['clean the house', 'do the dishes', 'workout']);

    // Get each todo as an array. I added data-testid="todo" to Todo.jsx component to be able to get it as an array.
    const arrOfListElements = screen.getAllByTestId('todo');

    expect(arrOfListElements.length).toBe(3);
  });

  test('todo task should NOT have CSS class of "isDone" if not completed', () => {
    render(<App />);

    addTodos(['workout']);

    const paragraphElement = screen.getByText(/workout/i);
    expect(paragraphElement).not.toHaveClass('isDone');
  });

  test('todo task should have CSS class of "isDone" if clicked', () => {
    render(<App />);

    addTodos(['workout']);

    const inputCheckbox = screen.getByRole('checkbox');
    fireEvent.click(inputCheckbox);

    const paragraphElement = screen.getByText(/workout/i);

    expect(paragraphElement).toHaveClass('_isDone_4b5f7e'); // because of using modules in my css
  });
});
