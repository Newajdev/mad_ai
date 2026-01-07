import { useEffect } from "react";

export default function ModalFormCard({
  title,
  fields,
  onSubmit,
  onClose,
  anchorRect,
}) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!anchorRect) return null;

  return (
    <div className="fixed inset-0 z-[999]">

      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="absolute bg-white rounded-xl p-6 shadow-xl w-[420px]"
        style={{
          top: anchorRect.bottom + 8,
          left: Math.max(16, anchorRect.right - 420),
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-primary">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-semibold mb-1">
                {f.label}
              </label>
              <input
                name={f.name}
                type={f.type || "text"}
                placeholder={f.placeholder}
                required={f.required}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-primary-light text-primary rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
