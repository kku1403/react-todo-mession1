export default function TodoItem({ todo, todos, setTodos }) {
  return (
    <li key={todo.id}>
      {/** 완료 여부 표시 */}
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={() => {
          const newTodos = todos.map((curTodo) => {
            return curTodo.id === todo.id
              ? { ...curTodo, checked: !curTodo.checked }
              : curTodo;
          });
          setTodos(newTodos);
        }}
      ></input>
      {/** 조회 */}
      {todo.id} / {JSON.stringify(todo.checked)} / {todo.text}
      {/** 삭제 */}
      <input
        type="button"
        value="삭제"
        onClick={() => {
          const newTodos = todos.filter((curTodo) => curTodo.id !== todo.id);
          setTodos(newTodos);
        }}
      ></input>
    </li>
  );
}
