export default function AddTodo({ onAdd }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        //값 가져오기
        const text = event.target.todo.value;

        //상태 처리
        onAdd(text);

        //입력 폼 초기화
        event.target.todo.value = "";
      }}
    >
      <input type="text" name="todo" placeholder="새로운 할 일"></input>
      <input type="submit" value="등록"></input>
    </form>
  );
}
