import { Icon } from "@iconify/react";

export default function ConfirmModal({
  title,
  description,
  onConfirm,
  onCancel,
  loading,
}) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">

      <div className="
        w-full
        max-w-[420px]
        bg-white
        rounded-[2.5rem]
        shadow-[0_25px_60px_rgba(0,0,0,0.25)]
        px-6
        sm:px-10
        py-8
        sm:py-10
        text-center
        space-y-8
        animate-in fade-in zoom-in duration-200
      ">

        {/* ICON */}
        <div className="flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-500">
            <Icon icon="lucide:save" className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">
            {title}
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-500 px-2">
            {description}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="
          flex
          flex-col
          sm:flex-row
          gap-4
          pt-2
        ">

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              w-full
              sm:flex-1
              bg-orange-500
              hover:bg-orange-600
              text-white
              py-4
              rounded-2xl
              font-bold
              shadow-lg
              shadow-orange-500/30
              transition-all
              active:scale-[0.98]
            "
          >
            {loading ? "Saving..." : "Yes, Save"}
          </button>

          <button
            onClick={onCancel}
            className="
              w-full
              sm:flex-1
              bg-gray-100
              text-gray-400
              py-4
              rounded-2xl
              font-bold
              hover:bg-gray-200
              transition-all
            "
          >
            No
          </button>

        </div>
      </div>
    </div>
  );
}
