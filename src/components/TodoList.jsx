import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        ></TodoItem>
      ))}
    </ul>
  );
}
