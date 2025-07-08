export default function ResetTodos({ initTodos, setTodos, nextId }) {
  return (
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
  );
}
