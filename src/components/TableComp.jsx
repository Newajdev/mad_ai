import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

/* ================= TABLE COMPONENT ================= */
export default function TableComp({ columns, data, className = "" }) {
  return (
    <div className={className}>
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block rounded-2xl shadow-sm bg-white overflow-hidden">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{ width: column.width }}
                  className="px-6 py-5 font-semibold text-sm whitespace-nowrap
                  first:rounded-tl-2xl last:rounded-tr-2xl"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.length ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ width: column.width }}
                      className={`px-6 py-4 text-sm font-medium text-text-main
                        ${column.align === "center" ? "text-center" : ""}`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-text-muted italic"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {data.length ? (
          data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="bg-white rounded-2xl shadow-sm p-4 space-y-3"
            >
              {columns.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="text-xs font-semibold text-gray-400">
                    {column.header}
                  </span>

                  <span className="text-sm font-medium text-text-main text-right">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-text-muted italic">
            No data found.
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STATUS DROPDOWN ================= */
export function StatusDropdown({ value: initialValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const dropdownRef = useRef(null);

  const options = ["Active", "Inactive", "Pending", "Banned"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Inactive":
        return "text-gray-500";
      case "Pending":
        return "text-orange-500";
      case "Banned":
        return "text-red-500";
      default:
        return "text-text-main";
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center gap-2 cursor-pointer
        hover:bg-gray-50 px-2 py-1 rounded-md transition whitespace-nowrap"
      >
        <span className={`font-semibold ${getStatusColor(selectedValue)}`}>
          {selectedValue}
        </span>
        <Icon
          icon="material-symbols:keyboard-arrow-down-rounded"
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border
        border-gray-200 rounded-lg shadow-dm z-30 py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedValue(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition
                ${
                  selectedValue === option
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

