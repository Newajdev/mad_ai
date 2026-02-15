import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function BackNextButtons({
  onNext,
  onBack,
  backLabel = "Back",
  nextLabel = "Next",
  disableBack = false,
  disableNext = false,
  showBack = true,
  showNext = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-4">
      {/* BACK */}
      {showBack ? (
        <button
          type="button"
          onClick={onBack ? onBack : () => navigate(-1)}
          disabled={disableBack}
          className={`text-primary flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer
            ${
              disableBack
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-primary-light"
            }`}
        >
          <Icon icon="material-symbols:arrow-back-rounded" width="20" />
          {backLabel}
        </button>
      ) : (
        <span />
      )}

      {/* NEXT */}
      {showNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext}
          className={`text-primary flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer
            ${
              disableNext
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-primary-light"
            }`}
        >
          {nextLabel}
          <Icon icon="material-symbols:arrow-forward-rounded" width="20" />
        </button>
      )}
    </div>
  );
}
