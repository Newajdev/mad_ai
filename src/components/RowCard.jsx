export default function RowCard({ children, className = "" }) {
  return (
    <div
      className={`flex justify-between items-start bg-white rounded-xl px-6 py-4 ${className}`}
    >
      {children}
    </div>
  );
}
