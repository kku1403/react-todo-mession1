export default function ResetTodos({ onReset }) {
  return (
    <button
      onClick={onReset}
      className="bg-[#f78da7] text-white px-7 py-2.5 font-semibold rounded-full shadow-md text-base transition-all hover:bg-[#ee6183] hover:scale-105 active:scale-95 mx-5"
    >
      리셋
    </button>
  );
}
