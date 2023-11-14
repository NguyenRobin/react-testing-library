import styles from '../styles/Button.module.css';
function Button({ onClick }) {
  return (
    <button className={styles.Button} onClick={onClick}>
      <span>+</span>
    </button>
  );
}

export default Button;
