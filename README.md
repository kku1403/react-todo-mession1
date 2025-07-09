# ✅ React TodoApp

<img src="./TodoApp.gif" alt="TodoApp Demo" width="600" />

# 📁 주요 기능 요약

- **할 일 등록**: 텍스트와 마감기한을 함께 입력
- **목록 초기화**: 전체 항목 삭제 및 ID 초기화
- **할 일 삭제**: 항목 개별 삭제
- **완료 체크**: 체크박스를 통한 완료 여부 표시
- **목록 분류**: 진행 중 / 완료 항목 분리
- **정렬**: 마감기한 기준 오름차순 정렬
- **마감기한 수정**: 날짜 직접 편집 가능
- **Local Storage 저장**: 새로고침 후에도 데이터 유지

---

# 🗂️ 폴더 구조 설명

```
src/
├─ components/            # 재사용 가능한 UI 컴포넌트들 모음
│  ├─ AddTodo.jsx        # 새 할 일 입력 폼 (텍스트 + 마감일 입력)
│  ├─ ResetTodos.jsx     # 전체 목록 초기화 버튼 컴포넌트
│  ├─ TodoItem.jsx       # 단일 할 일 렌더링 (삭제, 체크, 수정 포함)
│  └─ TodoList.jsx       # 할 일 배열을 받아 목록 렌더링
├─ hooks/
│  └─ useTodos.js        # 상태 관리 커스텀 훅 (등록, 삭제, 수정 등)
├─ utils/
│  └─ storage.js         # 로컬 스토리지 유틸 함수 모음
├─ App.jsx               # 애플리케이션 루트, 훅과 컴포넌트 연결
```

---

# 🔧 커스텀 훅: `useTodos` 구조 분석

| 이름         | 타입  | 설명                                  |
| ------------ | ----- | ------------------------------------- |
| `todos`      | state | 현재 할 일 목록 상태 배열 (객체 형태) |
| `nextId`     | ref   | 다음 할 일의 고유 ID 값을 저장        |
| `addTodo`    | 함수  | 새 할 일을 todos에 추가               |
| `resetTodos` | 함수  | 전체 초기화, todos 및 nextId 리셋     |
| `deleteTodo` | 함수  | 특정 ID 항목 제거                     |
| `toggleTodo` | 함수  | 완료 상태 토글 (checked 필드 반전)    |
| `editTodo`   | 함수  | 마감기한 수정                         |

---

# 🛠️ 기능별 상세 분석 및 구현 로직

## ✍️ 할 일 등록

### 기능 설명

- 사용자가 텍스트 입력받아 새로운 할 일 등록
- 마감기한 입력 가능

### 변수 설명

| 이름       | 타입     | 설명                                        |
| ---------- | -------- | ------------------------------------------- |
| `text`     | string   | 할 일 텍스트 입력값                         |
| `deadline` | string   | 마감기한 (YYYY-MM-DD)                       |
| `onAdd`    | function | addTodo 실행 함수                           |
| `newTodo`  | object   | 생성될 `{id, text, checked, deadline}` 객체 |

### 로직 흐름

1. form 제출 이벤트 발생
2. text와 deadline 추출
3. addTodo 함수 호출 → todos 상태에 새 객체 추가
4. 입력 필드 초기화 처리

<details>
<summary>🔍 AddTodo 컴포넌트 코드</summary>

```js
//AddTodo 컴포넌트
export default function AddTodo({ onAdd }) {
  return (
    <form
      className="flex flex-wrap items-center justify-center gap-3 px-5 pb-5"
      onSubmit={(event) => {
        event.preventDefault();

        //값 가져오기
        const text = event.target.todo.value;
        const deadline = event.target.deadline.value;

        //상태 처리(addTodo 함수)
        onAdd(text, deadline);

        //입력 폼 초기화
        event.target.todo.value = "";
        event.target.deadline.value = "";
      }}
    >
      <input type="text" name="todo" placeholder="새로운 할 일" />
      <input type="date" name="deadline" />
      <input type="submit" value="등록" />
    </form>
  );
}
```

</details>
<details>
<summary>🔍 addTodo 함수 코드</summary>

```js
//커스텀 훅 내부 추가 로직
const addTodo = (text, deadline) => {
  //새로운 Todo 객체 생성
  const newTodo = {
    id: nextId.current,
    text,
    checked: false,
    deadline,
  };

  //상태 업데이트
  setTodos([newTodo, ...todos]);
  nextId.current++;
};
```

</details>

---

## 🔄 전체 목록 초기화

### 기능 설명

- 전체 할 일을 삭제하고 초기 상태로 되돌리는 기능 (confirm 확인 포함)

### 변수 설명

| 이름      | 타입     | 설명                 |
| --------- | -------- | -------------------- |
| `onReset` | function | resetTodos 실행 함수 |

### 로직 흐름

1. `confirm()` 으로 사용자 의사 확인
2. true일 경우 상태를 초기 상태로 되돌림

<details>
<summary>🔍 ResetTodos 컴포넌트 코드</summary>

```js
//ResetTodos 컴포넌트
export default function ResetTodos({ onReset }) {
  return <button onClick={onReset}>리셋</button>; //클릭하면 resetTodos 함수 호출
}
```

</details>

<details>
<summary>🔍 resetTodos 함수 코드</summary>

```js
//커스텀 훅 내부 리셋 로직
const resetTodos = () => {
  //한 번 더 확인
  if (confirm("정말 초기화할까요?")) {
    //상태 초기화
    setTodos(initState);
    nextId.current = initState.length + 1;
  }
};
```

</details>

---

## ❌ 할 일 삭제

### 기능 설명

- 특정 ID에 해당하는 항목을 목록에서 제거

### 변수 설명

| 이름 | 타입   | 설명                     |
| ---- | ------ | ------------------------ |
| `id` | number | 삭제 대상 항목의 고유 ID |

### 로직 흐름

1. 버튼이 눌린 항목의 id를 비교
2. 삭제하려는 항목 제외하고 새로운 todos 구성 및 업데이트

<details>
<summary>🔍 deleteTodo 함수 코드</summary>

```js
//커스텀 훅 내부 삭제 로직
const deleteTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
```

</details>

---

## ✔️ 완료 체크

### 기능 설명

- 체크 표시를 통해 진행 or 완료 상태 표시

### 변수 설명

| 이름 | 타입   | 설명                    |
| ---- | ------ | ----------------------- |
| `id` | number | 상태를 반전시킬 항목 ID |

### 로직 흐름

1. 해당 항목의 id를 비교
2. id 비교를 통해 checked 토글하여 새로운 todos 구성 및 업데이트

<details>
<summary>🔍 toggleTodo 함수 코드</summary>

```js
//커스텀 훅 내부 토글 로직
const toggleTodo = (id) => {
  setTodos(
    todos.map((todo) => {
      return todo.id === id ? { ...todo, checked: !todo.checked } : todo;
    })
  );
};
```

</details>

---

## 🗂️ 목록 분류: 진행 / 완료

### 기능 설명

- 완료 여부(`checked`)에 따라 두 개의 리스트로 분리하여 렌더링

### 변수 설명

| 이름          | 타입  | 설명                  |
| ------------- | ----- | --------------------- |
| `undoneTodos` | Array | 진행 중인 항목 리스트 |
| `doneTodos`   | Array | 완료된 항목 리스트    |

### 로직 흐름

1. App내에서 todos 배열을 checked 여부에 따라 두 그룹으로 분리
2. App에서 목록 리턴할 때, 2개로 나뉜 리스트를 따로 보여주기
   - 어차피 TodoList에 보여줄 목록을 넘겨주기 때문에 가능

<details>
<summary>🔍 App 컴포넌트 코드</summary>

```js
//App.jsx에서 진행 중인 일, 완료된 일로 나누기
const undoneTodos = todos.filter((todo) => !todo.checked);
const doneTodos = todos.filter((todo) => todo.checked);

return (
  <>
    {/** 생략된 로직 */}
    ...
    {/**조회(삭제, 수정) */}
    <div>
      {/**진행 중 */}
      <section>
        <h2>진행</h2>
        <TodoList
          todos={todos.filter((todo) => !todo.checked)}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </section>

      {/**완료됨 */}
      <section>
        <h2>완료</h2>
        <TodoList
          todos={todos.filter((todo) => todo.checked)}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </section>
    </div>
  </>
);
```

</details>

---

## 📅 마감순 정렬

### 기능 설명

- 마감기한이 임박한 순으로 정렬

### 변수 설명

| 이름           | 타입    | 설명                        |
| -------------- | ------- | --------------------------- |
| `sortedTodos`  | Array   | 정렬된 할 일 배열           |
| `aHasDeadline` | Boolean | 항목 A의 마감기한 존재 여부 |
| `bHasDeadline` | Boolean | 항목 B의 마감기한 존재 여부 |

### 로직 흐름

1. 기한이 있는 항목을 우선 표시
2. 마감일이 빠를수록 위에 표시
3. 마감일이 없는 항목은 등록 순서대로 유지

<details>
<summary>🔍 TodoList 컴포넌트 코드</summary>

```js
//TodoList 컴포넌트
export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const sortedTodos = [...todos].sort((a, b) => {
    //기한 있는지 확인
    const aHasDeadline = !!a.deadline;
    const bHasDeadline = !!b.deadline;

    // 둘 다 기한 있음 -> 날짜 빠른 순 (오름차순)
    if (aHasDeadline && bHasDeadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }

    if (aHasDeadline) return -1; // a만 기한 있음 -> a가 앞
    if (bHasDeadline) return 1; // b만 기한 있음 -> b가 앞

    // 둘 다 기한 없음 -> 최근에 등록된 게 위로
    return b.id - a.id;
  });

  //정렬된 목록으로 map 돌리기
  return (
    <ul>
      {sortedTodos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          ></TodoItem>
        );
      })}
    </ul>
  );
}
```

</details>

---

## ✏️ 마감기한 수정

### 기능 설명

- 기존 마감기한을 수정

### 변수 설명

| 이름          | 타입     | 설명                        |
| ------------- | -------- | --------------------------- |
| `todo`        | object   | 수정 대상 항목              |
| `newDeadline` | string   | 사용자가 입력한 새로운 날짜 |
| `onEdit`      | function | editTodo 실행 함수          |

### 로직 흐름

1. 날짜 클릭 → 수정 모드로 전환
2. 저장 클릭 시 editTodo 호출 → 상태 업데이트
3. 취소 클릭 시 수정 모드 종료

<details>
<summary>🔍 TodoItem 컴포넌트 코드</summary>

```js
//TodoItem 컴포넌트
export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {

  //기한을 수정 중인지에 따라 UI 달라짐 -> 상태로 표현
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
        {/**생략된 로직 */}
        ...

        {/**마감 기한(수정 가능) */}
        {isEditing ? (
            //수정 중일 때
            <>
            <input
                type="date"
                defaultValue={todo.deadline || ""}
            />
            <button
                onClick={(e) => {
                //previousSibling : 현재 태그의 바로 전 형제 태그
                const newDeadline = e.target.previousSibling.value; //여기선 date값을 읽어오는 것
                onEdit(todo.id, newDeadline); //editTodo 호출
                setIsEditing(false);
                }}
            >
                저장
            </button>
            <button
                onClick={() => setIsEditing(false)}
            >
                취소
            </button>
            </>
        ) : (
            //수정 중 아닐 때
            <span
            onClick={() => setIsEditing(true)}
            title="클릭하면 수정 가능"
            >
            {todo.deadline || "기한 없음"}
            </span>
        )}
        </div>

        {/** 생략된 로직 */}
        ...

    </li>
  );
}
```

</details>

<details>
<summary>🔍 editTodo 함수 코드</summary>

```js
//커스텀 훅 내부 수정 로직
const editTodo = (id, newDeadline) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, deadline: newDeadline } : todo
    )
  );
};
```

## </details>

## 💾 로컬 스토리지 연동

### 기능 설명

- 사용자의 todos 상태를 브라우저 로컬 스토리지에 저장해 새로고침해도 유지

### 변수 설명

| 이름        | 타입     | 설명                                                          |
| ----------- | -------- | ------------------------------------------------------------- |
| `initState` | Array    | 초기 할 일 목록, 로컬 스토리지에 값이 없을 때 기본값으로 사용 |
| `getItem`   | function | 저장된 todos 불러오기                                         |
| `setItem`   | function | 변경된 todos 저장하기                                         |

### 로직 흐름

1. useTodos 초기 상태를 `getItem()`으로 설정
   - todos가 이미 존재한다면 존재하는 값으로, 없다면 initState로
2. useEffect로 todos가 바뀔 때마다 `setItem()` 실행

<details>
<summary>🔍 useTodos 커스텀 훅 코드</summary>

```js
//커스텀 훅
export function useTodos(initState) {

  //값이 있다면 가져오고 없다면 initState로 초기 설정
  const [todos, setTodos] = useState(() => {
    return getItem("todos", initState);
  });
  const nextId = useRef(todos.length + 1);

  //변경될 때마다 스토리지에 저장
  useEffect(() => {
    setItem("todos", todos);
  }, [todos]);

  // 생략된 로직
  ...
}
```

</details>

<details>
<summary>🔍 로컬 스토리 코드</summary>

```js
//storage.js
const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage set srror : ", e);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) {
      //todos가 이미 존재하면 있는 거 반환
      return JSON.parse(storedValue);
    }

    setItem(key, defaultValue); //아니면 초기값으로 설정 후 반환
    return defaultValue;
  } catch (e) {
    console.error("Storage get error : ", e);
    return defaultValue;
  }
};
```

</details>

---
