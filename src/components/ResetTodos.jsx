export default function ResetTodos({ onReset }) {
  return (
    <button onClick={onReset} className="btn-reset">
      리셋
    </button>
  );
}
