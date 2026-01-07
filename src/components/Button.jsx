import { Icon } from "@iconify/react";

export default function DynamicButton({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
    >
      {icon && <Icon icon={icon} width="20" />}
      {label}
    </button>
  );
}
