import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Todo from './Todo';

const mockedDeleteTodo = vi.fn();
const mockedUpdateTodo = vi.fn();

describe('Todo', () => {
  test('should delete a todo with correct id', () => {
    render(
      <Todo
        todo="eat"
        id={1}
        done={false}
        handleDeleteTodo={mockedDeleteTodo}
        handleUpdateTodo={mockedUpdateTodo}
      />
    );
    const trashIconBtn = screen.getByTitle('BsTrash');

    fireEvent.click(trashIconBtn);

    expect(mockedDeleteTodo).toHaveBeenCalledWith(1);
  });

  test('should toggle from BsPencil to AiOutlineCheck, when clicking on edit a todo (pencil)', () => {
    render(
      <Todo
        todo="eat"
        id={1}
        done={false}
        handleDeleteTodo={mockedDeleteTodo}
        handleUpdateTodo={mockedUpdateTodo}
      />
    );
    const pencilIconBtn = screen.getByTitle('BsPencil');
    fireEvent.click(pencilIconBtn);
    expect(screen.getByTitle('AiOutlineCheck')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('AiOutlineCheck'));
    expect(screen.getByTitle('BsPencil')).toBeInTheDocument();
  });

  test('should show a input field when clicking on the pencil', () => {
    render(
      <Todo
        todo="eat"
        id={1}
        done={false}
        handleDeleteTodo={mockedDeleteTodo}
        handleUpdateTodo={mockedUpdateTodo}
      />
    );
    const pencilIconBtn = screen.getByTitle('BsPencil');

    fireEvent.click(pencilIconBtn);

    const inputElement = screen.getByPlaceholderText(/eat/i);

    expect(inputElement).toBeInTheDocument();
  });

  test('should show correct todo value in the input field when clicking on the pencil', () => {
    render(
      <Todo
        todo="eat"
        id={1}
        done={false}
        handleDeleteTodo={mockedDeleteTodo}
        handleUpdateTodo={mockedUpdateTodo}
      />
    );
    const pencilIconBtn = screen.getByTitle('BsPencil');

    fireEvent.click(pencilIconBtn);

    const inputElement = screen.getByPlaceholderText(/eat/i);

    expect(inputElement).toHaveValue('eat');
  });

  test('should update old todo value to new todo value in the input after typing a new value by clicking/confirming on the AiOutlineCheck', () => {
    render(
      <Todo
        todo="eat"
        id={1}
        done={false}
        handleDeleteTodo={mockedDeleteTodo}
        handleUpdateTodo={mockedUpdateTodo}
      />
    );
    const pencilIconBtn = screen.getByTitle('BsPencil');
    fireEvent.click(pencilIconBtn);

    const inputElement = screen.getByPlaceholderText(/eat/i);

    fireEvent.change(inputElement, { target: { value: 'Make dinner' } });

    expect(inputElement.value).toBe('Make dinner');
  });

  test('should toggle from true/false when clicking on checkbox, which shows if a todo is done or not, ', () => {
    render(
      <Todo
        todo="eat"
        id={1}
        done={false}
        handleDeleteTodo={mockedDeleteTodo}
        handleUpdateTodo={mockedUpdateTodo}
      />
    );
    const inputCheckboxElement = screen.getByRole('checkbox');

    // first click
    fireEvent.click(inputCheckboxElement);
    expect(inputCheckboxElement.checked).toEqual(true);

    // second click
    fireEvent.click(inputCheckboxElement);
    expect(inputCheckboxElement.checked).toEqual(false);

    screen.debug();
  });
});
