import { useState, useRef } from "react";

function App() {
  //초기 상태
  const initTodos = [
    { id: 2, text: "TodoList 개선하기" },
    { id: 1, text: "기술 블로그 작성하기" },
  ];

  //상태 선언 및 초기화
  const [todos, setTodos] = useState(initTodos);
  let nextId = useRef(initTodos.length + 1);

  return (
    <>
      {/** 등록 */}
      <form
        onSubmit={(event) => {
          event.preventDefault();

          //값 가져오기
          const text = event.target.todo.value;
          const newTodo = { id: nextId.current, text };

          //상태 업그레이드
          setTodos([newTodo, ...todos]);
          nextId.current++;

          //입력 폼 초기화
          event.target.todo.value = "";
        }}
      >
        <input type="text" name="todo" placeholder="새로운 할 일"></input>
        <input type="submit" value="등록"></input>
      </form>

      {/** 조회 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} / {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
