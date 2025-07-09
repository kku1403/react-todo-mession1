import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  //날짜 순으로 정렬
  const sortedTodos = [...todos].sort((a, b) => {
    const aHasDeadline = !!a.deadline;
    const bHasDeadline = !!b.deadline;

    //둘 다 기한이 있으면 -> 임박한 순으로 정렬
    if (aHasDeadline && bHasDeadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }

    if (aHasDeadline) return -1; //a만 기한 있음 -> a가 앞
    if (bHasDeadline) return 1; //b만 기한 있음 -> b가 앞

    //둘 다 기한 없음 -> 최근에 등록된 게 위로
    return a.id - b.id;
  });

  return (
    <ul>
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        ></TodoItem>
      ))}
    </ul>
  );
}
