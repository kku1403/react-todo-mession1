import AddTodo from "./components/AddTodo";
import ResetTodos from "./components/ResetTodos";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  //초기 상태
  const initTodos = [
    { id: 2, text: "TodoList 개선하기", checked: true, deadline: "2025-07-06" },
    {
      id: 1,
      text: "기술 블로그 작성하기",
      checked: false,
      deadline: "2025-07-06",
    },
  ];

  //상태 및 관련 함수 가져오
  const { todos, addTodo, resetTodos, deleteTodo, toggleTodo } =
    useTodos(initTodos);

  //투두 분리
  const undoneTodos = todos.filter((todo) => !todo.checked);
  const doneTodos = todos.filter((todo) => todo.checked);

  return (
    <>
      {/** 등록 */}
      <AddTodo onAdd={addTodo}></AddTodo>

      {/** 리셋 */}
      <ResetTodos onReset={resetTodos}></ResetTodos>

      {/**조회 (삭제, 수정)*/}
      <div className="todo-container">
        {/**진행 중 */}
        <section className="todo-section">
          <h2>진행</h2>
          <TodoList
            todos={undoneTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>

        {/**완료됨 */}
        <section className="todo-section">
          <h2>완료</h2>
          <TodoList
            todos={doneTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>
      </div>
    </>
  );
}

export default App;
