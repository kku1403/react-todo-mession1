export default function AddTodo({ todos, setTodos, nextId }) {
  return (
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
  );
}
