import AddTodo from "./components/AddTodo";
import ResetTodos from "./components/ResetTodos";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

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

  //상태 및 관련 함수 가져오기
  const { todos, addTodo, resetTodos, deleteTodo, toggleTodo, editTodo } =
    useTodos(initTodos);

  //투두 분리
  const undoneTodos = todos.filter((todo) => !todo.checked);
  const doneTodos = todos.filter((todo) => todo.checked);

  return (
    <>
      <div className="pt-24 w-[1000px] mx-auto">
        {/** 등록 */}
        <AddTodo onAdd={addTodo}></AddTodo>

        {/** 리셋 */}
        <ResetTodos onReset={resetTodos}></ResetTodos>
      </div>

      {/**조회 (삭제, 수정)*/}
      <div className="flex gap-6 p-5 box-border w-[1000px] mx-auto">
        {/**진행 중 */}
        <section className="flex-1 bg-gray-100 rounded-xl p-5 shadow max-h-[80vh] overflow-y-auto">
          <h2 className="mt-0 font-bold text-2xl text-[#333] border-b-2 border-[#5b9bd5] pb-2">
            진행
          </h2>
          <TodoList
            todos={undoneTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </section>
        {/**완료됨 */}
        <section className="flex-1 bg-gray-100 rounded-xl p-5 shadow max-h-[80vh] overflow-y-auto">
          <h2 className="mt-0 font-bold text-2xl text-[#333] border-b-2 border-[#5b9bd5] pb-2">
            완료
          </h2>
          <TodoList
            todos={doneTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </section>
      </div>
    </>
  );
}

export default App;
