import { useState, useRef, useEffect } from "react";
import { getItem, setItem } from "../storage";

export function useTodos(initState) {
  const [todos, setTodos] = useState(() => {
    return getItem("todos", initState);
  });
  const nextId = useRef(todos.length + 1);

  //변경될 때마다 스토리지에 저장
  useEffect(() => {
    setItem("todos", todos);
  }, [todos]);

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

  //마감기한 수정
  const editTodo = (id, newDeadline) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, deadline: newDeadline } : todo
      )
    );
  };

  return { todos, addTodo, resetTodos, deleteTodo, toggleTodo, editTodo };
}
