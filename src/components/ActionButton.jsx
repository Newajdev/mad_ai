export default function ActionButton({
  label = "Add",
  onClick,
  buttonRef,
  className = "",
}) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`
        px-6 py-3
        bg-primary
        text-white
        rounded-lg
        font-semibold
        whitespace-nowrap
        transition
        hover:opacity-90
        ${className}
      `}
    >
      {label}
    </button>
  );
}
