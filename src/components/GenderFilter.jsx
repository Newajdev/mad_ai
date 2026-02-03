import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";

export default function GenderFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Filter Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary-light transition"
      >
        <Icon
          icon="material-symbols:filter-list-rounded"
          width="26"
          height="26"
        />
        {value ? value : "Filter"}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-30 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <button
            onClick={() => {
              onChange("Male");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            All
          </button>

          <button
            onClick={() => {
              onChange("Female");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Male
          </button>

          <button
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100"
          >
            Female
          </button>
        </div>
      )}
    </div>
  );
}
