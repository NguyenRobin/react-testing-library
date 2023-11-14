import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './views/TodoList';
import AppLayout from './views/AppLayout';
import AddTodo from './views/AddTodo';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  function handleAddTodo(newTodo) {
    setTodoList((todoList) => [...todoList, newTodo]);
  }

  function handleDeleteTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function handleUpdateTodo(updatedTodo) {
    setTodoList((todoList) => {
      const todoIndex = todoList.findIndex(
        (todo) => todo.id === updatedTodo.id
      );

      if (todoIndex !== -1) {
        const updatedList = [...todoList];
        updatedList[todoIndex] = updatedTodo;
        return updatedList;
      }

      return [...todoList, updatedTodo];
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <TodoList
                handleDeleteTodo={handleDeleteTodo}
                handleUpdateTodo={handleUpdateTodo}
                todoList={todoList}
              />
            }
          />
          <Route
            path="/add-todo"
            element={<AddTodo handleAddTodo={handleAddTodo} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
