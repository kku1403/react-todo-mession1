import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  //기한을 수정 중인지에 따라 UI 달라짐 -> 상태로 표현
  const [isEditing, setIsEditing] = useState(false);
  //임시 상태를 쓰지 않으면, 저장 누르기 전에 값이 바뀌어 버림
  const [tempDeadline, setTempDeadline] = useState(todo.deadline || "");

  return (
    <li className={`todo-item ${todo.checked ? "todo-completed" : ""}`}>
      <div className="todo-left">
        {/** 완료 여부 표시 */}
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => onToggle(todo.id)}
        ></input>
        {/** todo */}
        <span className="todo-text">{todo.text}</span>

        {/**마감 기한(수정 가능) */}
        {isEditing ? ( //수정 중일 때
          <>
            <input
              type="date"
              value={tempDeadline}
              onChange={
                //상태바뀔 때마다 어떻게 할 건지 정의
                (e) => setTempDeadline(e.target.value) //선택된 날짜 temp에 저장하여 바로 상태 변경되지 않도록
              }
            />
            <button
              onClick={() => {
                onEdit(todo.id, tempDeadline);
                setIsEditing(false);
              }}
            >
              저장
            </button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </>
        ) : (
          //수정 중 아닐 때
          <span
            className="todo-deadline"
            onClick={() => setIsEditing(true)} //날짜 클릭하면 수정모드로 변환
            style={{ cursor: "pointer", marginLeft: "8px", color: "#555" }}
            title="클릭하면 수정 가능"
          >
            {todo.deadline || "마감기한 없음"}
          </span>
        )}
      </div>
      {/** 삭제 */}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}
