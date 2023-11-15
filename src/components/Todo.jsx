import { useEffect, useState } from 'react';
import styles from '../styles/Todo.module.css';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
function Todo({ todo, done, id, handleDeleteTodo, handleUpdateTodo }) {
  const [isDone, setIsDone] = useState(done);
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setUpdateTodoText] = useState(todo);

  function handleToggleCheckBox() {
    setIsDone((isDone) => !isDone);
  }

  useEffect(() => {
    handleUpdateTodo({ id, todo, done: isDone });
  }, [isDone]);

  function deleteTodo() {
    handleDeleteTodo(id);
  }

  function startEditing() {
    setIsEditing((isEditing) => !isEditing);
  }

  function editTodoText(e) {
    if (isEditing) {
      setUpdateTodoText(e.target.value);
    }
  }

  function updateTodo() {
    if (todoText === '') return;
    const editedTodo = { id, todo: todoText, done: isDone };
    handleUpdateTodo(editedTodo);
    setIsEditing(false);
  }

  return (
    <li className={styles.Todo} data-testid="todo">
      <input type="checkbox" checked={isDone} onChange={handleToggleCheckBox} />
      {isEditing ? (
        <input
          type="text"
          placeholder={todo}
          value={todoText}
          onChange={editTodoText}
        />
      ) : (
        <p className={`${isDone ? styles.isDone : ''}`}>{todo}</p>
      )}
      <div>
        {isEditing ? (
          <AiOutlineCheck
            title="AiOutlineCheck"
            className={styles.Edit}
            size={20}
            onClick={updateTodo}
          />
        ) : (
          <BsPencil
            title="BsPencil"
            className={styles.Edit}
            size={20}
            onClick={startEditing}
          />
        )}
        <BsTrash
          title="BsTrash"
          className={styles.Trashcan}
          size={20}
          onClick={deleteTodo}
        />
      </div>
    </li>
  );
}

export default Todo;
