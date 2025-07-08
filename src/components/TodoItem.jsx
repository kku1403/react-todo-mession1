export default function TodoItem({ todo, onToggle, onDelete }) {
  const deadlineText = todo.deadline;
  return (
    <li>
      {/** 완료 여부 표시 */}
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={() => onToggle(todo.id)}
      ></input>
      {/** 조회 */}
      {todo.id} / {JSON.stringify(todo.checked)} / {todo.text} / {deadlineText}/
      {/** 삭제 */}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}
