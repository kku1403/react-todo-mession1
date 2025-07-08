import { useState, useRef } from "react";

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
      <form
        onSubmit={(event) => {
          event.preventDefault();

          //값 가져오기
          const text = event.target.todo.value;
          const newTodo = { id: nextId.current, text, checked: false };

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

      {/** 리셋 */}
      <input
        type="button"
        value="리셋"
        onClick={() => {
          if (confirm("정말 초기화하시겠습니까?")) {
            setTodos(initTodos);
            nextId.current = initTodos.length + 1;
          }
        }}
      ></input>

      <ul>
        {todos.map((todo) => (
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
                const newTodos = todos.filter(
                  (curTodo) => curTodo.id !== todo.id
                );
                setTodos(newTodos);
              }}
            ></input>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
