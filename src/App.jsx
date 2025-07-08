import { useState, useRef } from "react";
import AddTodo from "./components/AddTodo";
import ResetTodos from "./components/ResetTodos";
import TodoList from "./components/TodoList";

function App() {
  //초기 상태
  const initTodos = [
    { id: 2, text: "TodoList 개선하기", checked: true },
    { id: 1, text: "기술 블로그 작성하기", checked: false },
  ];

  //상태 선언 및 초기화
  const [todos, setTodos] = useState(initTodos);
  let nextId = useRef(initTodos.length + 1);

  return (
    <>
      {/** 등록 */}
      <AddTodo todos={todos} setTodos={setTodos} nextId={nextId}></AddTodo>

      {/** 리셋 */}
      <ResetTodos
        initTodos={initTodos}
        setTodos={setTodos}
        nextId={nextId}
      ></ResetTodos>

      {/**조회 */}
      <TodoList todos={todos} setTodos={setTodos}></TodoList>
    </>
  );
}

export default App;
