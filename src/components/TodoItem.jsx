export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      {/** 완료 여부 표시 */}
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={() => onToggle(todo.id)}
      ></input>
      {/** 조회 */}
      {todo.id} / {JSON.stringify(todo.checked)} / {todo.text}
      {/** 삭제 */}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}
