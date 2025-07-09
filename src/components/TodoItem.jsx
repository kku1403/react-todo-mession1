import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  //기한을 수정 중인지에 따라 UI 달라짐 -> 상태로 표현
  const [isEditing, setIsEditing] = useState(false);
  //임시 상태를 쓰지 않으면, 저장 누르기 전에 값이 바뀌어 버림
  const [tempDeadline, setTempDeadline] = useState(todo.deadline || "");

  return (
    <li
      className={`flex items-center justify-between px-3 py-2 border-b border-gray-300 ${
        todo.checked ? "line-through text-gray-500" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        {" "}
        {/** 완료 여부 표시 */}
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => onToggle(todo.id)}
        ></input>
        {/** todo */}
        <span className="text-base text-gray-800"> {todo.text}</span>
        {/**마감 기한(수정 가능) */}
        {isEditing ? (
          //수정 중일 때
          <>
            <input
              type="date"
              value={tempDeadline}
              onChange={(e) => setTempDeadline(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
            <button
              className="ml-2 text-sm text-blue-600 hover:underline"
              onClick={() => {
                onEdit(todo.id, tempDeadline);
                setIsEditing(false);
              }}
            >
              저장
            </button>
            <button
              className="ml-1 text-sm text-gray-600 hover:underline" // tailwind 추가
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
          </>
        ) : (
          //수정 중 아닐 때
          <span
            className="text-sm text-gray-600 ml-3 cursor-pointer hover:underline"
            onClick={() => setIsEditing(true)}
            title="클릭하면 수정 가능"
          >
            {todo.deadline || "기한 없음"}
          </span>
        )}
      </div>

      {/** 삭제 */}
      <button
        className="text-sm text-red-500 hover:underline ml-4"
        onClick={() => onDelete(todo.id)}
      >
        삭제
      </button>
    </li>
  );
}
