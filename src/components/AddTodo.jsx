export default function AddTodo({ onAdd }) {
  return (
    <form
      className="flex flex-wrap items-center justify-center gap-3 px-5 pb-5"
      onSubmit={(event) => {
        event.preventDefault();

        //값 가져오기
        const text = event.target.todo.value;
        const deadline = event.target.deadline.value;

        //상태 처리
        onAdd(text, deadline);

        //입력 폼 초기화
        event.target.todo.value = "";
        event.target.deadline.value = "";
      }}
    >
      <input
        type="text"
        name="todo"
        placeholder="새로운 할 일"
        className="w-[473px] p-2.5 border-[1.5px] border-gray-300 rounded-lg text-base transition focus:outline-none focus:border-[#5b9bd5]"
      />
      <input
        type="date"
        name="deadline"
        className="min-w-[180px] flex-1 p-2.5 border-[1.5px] border-gray-300 rounded-lg text-base transition focus:outline-none focus:border-[#5b9bd5]"
      />
      <input
        type="submit"
        value="등록"
        className="min-w-[100px] px-7 py-2.5 bg-[#5b9bd5] text-white font-semibold rounded-lg cursor-pointer transition hover:bg-[#4178c0]"
      />
    </form>
  );
}
