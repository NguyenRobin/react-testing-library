import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AddTodo from './AddTodo';

const mockedAddTodo = vi.fn();

describe('AddTodo', () => {
  test('should render input element', () => {
    render(
      <BrowserRouter>
        <AddTodo handleAddTodo={mockedAddTodo} />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Add new task/);
    expect(inputElement).toBeInTheDocument();
  });

  test('should be able to type in input', () => {
    render(
      <BrowserRouter>
        <AddTodo handleAddTodo={mockedAddTodo} />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Add new task/);
    fireEvent.change(inputElement, { target: { value: 'Make lunch' } });
    expect(inputElement.value).toBe('Make lunch');
  });

  test('should reset the input when button is clicked', () => {
    render(
      <BrowserRouter>
        <AddTodo handleAddTodo={mockedAddTodo} />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Add new task/);
    const buttonElement = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(inputElement, { target: { value: 'Make lunch' } });
    fireEvent.click(buttonElement);

    expect(inputElement.value).toBe('');
    screen.debug();
  });
});
