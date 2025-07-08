export default function TodoItem({ todo, onToggle, onDelete }) {
  const deadlineText = todo.deadline;
  return (
    <li className={`todo-item ${todo.checked ? "todo-completed" : ""}`}>
      <div className="todo-left">
        {/** 완료 여부 표시 */}
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => onToggle(todo.id)}
        ></input>
        {/** 조회 */}
        <span className="todo-text">{todo.text}</span>
        {deadlineText && <span className="todo-deadline">{deadlineText}</span>}
      </div>
      {/** 삭제 */}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}
