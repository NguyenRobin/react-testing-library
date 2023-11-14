import { BsArrowLeftCircle } from 'react-icons/bs';
import styles from '../styles/AddTodo.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateID } from '../utils/generateID';

function AddTodo({ handleAddTodo }) {
  const [todoText, setTodoText] = useState('');
  const navigate = useNavigate();

  function goBack() {
    navigate('/');
  }

  function handleOnChange(e) {
    setTodoText(e.target.value);
  }

  function addTodo() {
    if (todoText === '') return;
    const id = generateID();
    const newTodo = { id, todo: todoText, done: false };
    handleAddTodo(newTodo);
    navigate('/');
    setTodoText('');
  }

  return (
    <section className={styles.AddTodo}>
      <div>
        <BsArrowLeftCircle onClick={goBack} size={30} />
      </div>

      <input
        type="text"
        value={todoText}
        onChange={handleOnChange}
        placeholder="Todo..."
      />

      <button onClick={addTodo}>Add</button>
    </section>
  );
}

export default AddTodo;
