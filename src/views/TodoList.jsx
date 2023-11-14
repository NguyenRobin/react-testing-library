import Todo from '../components/Todo';
import styles from '../styles/TodoList.module.css';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function TodoList({ todoList, handleDeleteTodo, handleUpdateTodo }) {
  const navigate = useNavigate();

  function navigateToAddTodo() {
    navigate('/add-todo');
  }

  return (
    <div className={styles.TodoList}>
      <h2>Today 📋</h2>
      {todoList.length > 0 ? (
        <ul>
          {todoList.map((todo) => (
            <Todo
              handleUpdateTodo={handleUpdateTodo}
              key={todo.id}
              todo={todo.todo}
              done={todo.done}
              id={todo.id}
              handleDeleteTodo={handleDeleteTodo}
            />
          ))}
        </ul>
      ) : (
        <p>No todos</p>
      )}

      <Button onClick={navigateToAddTodo} />
    </div>
  );
}

export default TodoList;
