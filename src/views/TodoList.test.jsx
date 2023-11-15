import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TodoList from './TodoList';

const mockedDeleteTodo = vi.fn();
const mockedUpdateTodo = vi.fn();

describe('TodoList', () => {
  test('should display "No todos" if todoList is empty', () => {
    const todoList = [];

    render(
      <BrowserRouter>
        <TodoList todoList={todoList} />
      </BrowserRouter>
    );

    const paragraphElement = screen.getByText(/No todos/i);

    expect(paragraphElement).toBeInTheDocument();
  });

  test('should display a ul if there is a todo in the array', () => {
    const todoList = [{ id: 1, todo: 'eat', done: false }];

    render(
      <BrowserRouter>
        <TodoList
          todoList={todoList}
          handleDeleteTodo={mockedDeleteTodo}
          handleUpdateTodo={mockedUpdateTodo}
        />
      </BrowserRouter>
    );

    const ulElement = screen.getByRole('listitem');

    expect(ulElement).toBeInTheDocument(); // <ul></ul>
  });
});
