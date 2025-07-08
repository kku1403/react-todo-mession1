import { useState, useRef } from "react";

export function useTodos(initState) {
  const [todos, setTodos] = useState(initState);
  const nextId = useRef(initState.length + 1);

  //추가
  const addTodo = (text, deadline) => {
    const newTodo = {
      id: nextId.current,
      text,
      checked: false,
      deadline,
    };

    setTodos([newTodo, ...todos]);
    nextId.current++;
  };

  //리셋
  const resetTodos = () => {
    if (confirm("정말 초기화할까요?")) {
      setTodos(initState);
      nextId.current = initState.length + 1;
    }
  };

  //삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //토글
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, checked: !todo.checked } : todo;
      })
    );
  };

  return { todos, addTodo, resetTodos, deleteTodo, toggleTodo };
}
