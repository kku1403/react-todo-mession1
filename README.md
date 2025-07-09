# Todo

![Todo 이미지](image.png)

## 주요 기능

- 등록 (+ 마감기한)
- 목록 초기화
- 삭제
- 완료 체크
- 목록 분류 (진행 or 완료)
- 목록 정렬
- 마감기한 수정
- local storage에 저장

---

## 폴더 구조

```bash
src/
├─ components/
│  ├─ AddTodo.jsx        # 새로운 할 일 등록 입력 폼 컴포넌트
│  ├─ ResetTodos.jsx     # 전체 초기화 버튼 컴포넌트
│  ├─ TodoItem.jsx       # 개별 할 일 항목 컴포넌트 (삭제, 체크 기능 포함)
│  └─ TodoList.jsx       # 할 일 목록을 렌더링하는 컴포넌트
├─ hooks/
│  └─ useTodos.js        # 상태 관리 및 할 일 추가/삭제/수정/리셋 기능을 포함한 커스텀 훅
├─ utils/
│  └─ storage.js         # 로컬 스토리지 저장/불러오기 관련 유틸 함수
├─ App.jsx               # 전체 앱 루트 컴포넌트, 훅과 컴포넌트 연결 담당
```

## 커스텀 훅(useTodos)

- **todos (state)** : 할 일 객체 배열( `{id, text, checked, deadline}` )
- **nextId (ref)** : 다음에 추가할 할 일의 고유 ID를 관리
- **addTodo (text, deadline)** : 새로운 할 일 등록
- **resetTodos ()** : 초기 상태로 리셋
- **deleteTodo (id)** : 특정 할 일 삭제
- **toggleTodo (id)** : 완료 여부 토글
- \*\*editTodo (id)

---

# 문제 해결 과정

## 할 일 등록

### 기능 설명

- 새로운 할 일을 등록
- 마감 기한 입력 가능

### 변수 설명

| 변수 이름  | 타입       | 설명                                                                      |
| ---------- | ---------- | ------------------------------------------------------------------------- |
| `onAdd`    | `function` | `AddTodo` 컴포넌트에 전달된 콜백 함수 `addTodo`. 등록 버튼 클릭 시 호출됨 |
| `text`     | `string`   | 사용자가 입력한 할 일 내용                                                |
| `deadline` | `string`   | 사용자가 선택한 마감 기한 (YYYY-MM-DD 형식)                               |
| `newTodo`  | `object`   | 새로 생성된 할 일 객체 (`id`, `text`, `checked`, `deadline` 포함)         |

### 로직 설명

- AddTodo 컴포넌트의 form에서 onSubmit 이벤트 발생
- 사용자가 입력한 텍스트와 날짜 값을 추출
- `onAdd` 호출 해 새로운 할 일 객체 추가 및 상태 업데이트
- 입력 폼 초기화

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

---

## 초기화

### 기능 설명

- 초기화 하기 전 한 번 더 확인
- 목록을 초기 상태로

### 변수 설명

| 변수 이름 | 타입       | 설명                                                                             |
| --------- | ---------- | -------------------------------------------------------------------------------- |
| `onReset` | `function` | `ResetTodos` 컴포넌트에 전달된 콜백 함수 `resetTodos`. 초기화 버튼 누르면 호출됨 |

### 로직 설명

- 클릭 시 confirm()으로 한 번 더 확인(실수 방지)
- todos 상태 초기화 + ID 초기화

```js
//ResetTodos 컴포넌트
export default function ResetTodos({ onReset }) {
  return <button onClick={onReset}>리셋</button>; //클릭하면 resetTodos 함수 호출
}
```

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

---

## 할 일 삭제

### 기능 설명

- 특정 할 일 삭제

### 변수 설명

| 변수 이름 | 타입     | 설명                |
| --------- | -------- | ------------------- |
| `id`      | `number` | 지울 항목의 고유 id |

### 로직 설명

- 버튼이 눌린 항목의 id를 비교
- 삭제하려는 항목 제외하고 새로운 todos 구성 및 업데이트

```js
//커스텀 훅 내부 삭제 로직
const deleteTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
```

---

## 할 일 체크

### 기능 설명

- 체크 표시를 통해 진행 or 완료 상태 표시

### 변수 설명

| 변수 이름 | 타입     | 설명                  |
| --------- | -------- | --------------------- |
| `id`      | `number` | 토글한 항목의 고유 id |

### 로직 설명

- 해당 항목의 id를 비교
- id 비교를 통해 checked 토글하여 새로운 todos 구성 및 업데이트

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

---

## 목록 분류 (진행/ 완료)

### 기능 설명

- 목록을 분리하여 표시

### 변수 설명

| 변수 이름     | 타입    | 설명                                |
| ------------- | ------- | ----------------------------------- |
| `undoneTodos` | `Array` | 체크되지 않은(진행 중인) 할 일 목록 |
| `doneTodos`   | `Array` | 체크된(완료된) 할 일 목록           |

### 로직 설명

- App내에서 todos 배열을 checked 여부에 따라 두 그룹으로 분리
- App에서 목록 리턴할 때, 2개로 나뉜 리스트를 따로 보여주기
  - 어차피 TodoList에 보여줄 목록을 넘겨주기 때문에 가능

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

---

## 목록 정렬

### 기능 설명

- 마감기한이 임박한 순으로 정렬

### 변수 설명

| 변수 이름      | 타입      | 설명                                  |
| -------------- | --------- | ------------------------------------- |
| `sortedTodos`  | `Array`   | 정렬된 할 일 목록                     |
| `aHasDeadline` | `Boolean` | 비교 대상 a에 마감 기한이 있는지 여부 |
| `bHasDeadline` | `Boolean` | 비교 대상 b에 마감 기한이 있는지 여부 |

### 로직 설명

- deadline이 있는 항목을 우선 표시
- 마감일이 빠를수록 위에 표시
- 마감일이 없는 항목을 등록 순서대로 유지

```js
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

---

## 마감기한 수정

### 기능 설명

- 기존 마감기한을 수정

### 변수 설명

| 변수명        | 타입       | 설명                                               |
| ------------- | ---------- | -------------------------------------------------- |
| `todo`        | `Object`   | 할 일 항목 정보 (`id`, `deadline` 포함)            |
| `newDeadline` | `string`   | 새로운 마감기한                                    |
| `onEdit`      | `function` | `TodoItem` 컴포넌트에 전달된 콜백 함수 `editTodo`. |

### 로직 설명

- 목록에서 마감기한 클릭시 수정 가능 (isEditing = true)
- 수정 모드에서는 date 입력창과, 저장, 취소 버튼이 나타남
- 날짜를 선택하고 저장을 누르면 새로운 마감기한으로 업데이트
- 취소를 누르면 기존 마감기한으로 유지

```js
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

---

## 로컬 스토리지에 저장

---

# 새로 알게 된 내용

### 1. 클로저

❓ 훅 내부 함수들은 어떻게 최신 상태의 값을 가져올까?

- `todos`는 `addTodo`함수의 인자로 주어지지 않음
- JS의 클로저 개념으로 인해 `useTodos` 훅 내부에서 `addTodo` 함수가 선언될 때, `todos`가 존재하는 상위 스코프(외부 영역)를 기억함.
- 덕분에 props로 todos를 내려보낼 필요없이 내부에서 상태 접근 가능

❓ 선언될 때의 todos를 기억하는 거면 todos가 업데이트 되고 난 후에는 어떻게 기억할 수 있는 걸까? (왜 함수 내부 상태 참조는 항상 최신일까)

- `useTodos`가 포함된 컴포넌트가 리렌더링 되면 `useTodos` 함수가 다시 실행됨
- 즉 useTodos 내부에 정의된 함수들이 새로 만들어짐
- 이 과정에서 각 함수들은 항상 최신 상태를 참조하게 되는 것

📝요약

1. 상태 변경
2. 컴포넌트 다시 실행
3. useTodos 다시 실행
4. useTodos 내부 함수들 새로 정의
5. 결국엔 항상 최신 상태를 참조하게 됨

### 2. 함수 호출 X -> 함수 전달

❓`onChange={onToggle(todo.id)}` 이렇게 쓰면 안되는 이유

```js
onChange={onToggle(todo.id)} // 즉시 호출됨
onChange={() => onToggle(todo.id)} // 함수 전달
```

- 1번의 경우 컴포넌트가 렌더링 되는 순간에 `onToggle(todo.id)`가 즉시 실행됨

  - 해당 이벤트가 아니라 다른 이벤트로 리렌더링 되더라도 호출될 수 있음

- 2번처럼 해야 실제 이벤트 발생 시 함수가 호출 됨

### 3. `<li>`가 아닌 `<TodoItem>`에서 key값을 줘야 하는 이유

- React는 리스트 렌더링 시 key값을 이용해 각 컴포넌트를 식별하고, 효율적으로 업데이트함

- key는 React가 직접 렌더링하는 컴포넌트의 **최상위 요소**에 붙여야 함
  - 현재 코드에서 최상위 태크는 <li>가 아닌 <TodoItem>이므로 여기다 붙여야 함
