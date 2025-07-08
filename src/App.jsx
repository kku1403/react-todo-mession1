import { useState, useRef } from "react";
import AddTodo from "./components/AddTodo";
import ResetTodos from "./components/ResetTodos";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  //초기 상태
  const initTodos = [
    { id: 2, text: "TodoList 개선하기", checked: true },
    { id: 1, text: "기술 블로그 작성하기", checked: false },
  ];

  //상태 및 관련 함수 가져오
  const { todos, addTodo, resetTodos, deleteTodo, toggleTodo } =
    useTodos(initTodos);

  return (
    <>
      {/** 등록 */}
      <AddTodo onAdd={addTodo}></AddTodo>

      {/** 리셋 */}
      <ResetTodos onReset={resetTodos}></ResetTodos>

      {/**조회 (삭제, 수정)*/}
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      ></TodoList>
    </>
  );
}

export default App;
