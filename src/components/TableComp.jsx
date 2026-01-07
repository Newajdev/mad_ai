import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function TableComp({ columns, data, className = "" }) {
    return (
        <div className={`rounded-2xl shadow-sm bg-white overflow-visible ${className}`}>
            <table className="w-full text-left border-collapse overflow-visible">
                <thead>
                    <tr className="bg-primary text-white">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-5 font-semibold text-sm whitespace-nowrap first:rounded-tl-2xl last:rounded-tr-2xl"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 overflow-visible">
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-gray-50/50 transition-colors"
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 text-sm text-text-main font-medium overflow-visible"
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
    );
}

// Utility component for Status dropdowns
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setSelectedValue(option);
        setIsOpen(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active": return "text-green-600";
            case "Inactive": return "text-gray-500";
            case "Pending": return "text-orange-500";
            case "Banned": return "text-red-500";
            default: return "text-text-main";
        }
    };

    return (
        <div className={`relative inline-block ${isOpen ? "z-50" : "z-10"}`} ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 px-2 rounded-md transition-colors whitespace-nowrap"
            >
                <span className={`font-semibold ${getStatusColor(selectedValue)}`}>
                    {selectedValue}
                </span>
                <Icon
                    icon="material-symbols:keyboard-arrow-down-rounded"
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white opacity-100 border border-gray-200 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-[999] py-1">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${selectedValue === option ? "bg-primary-light text-primary font-bold" : "text-gray-700"
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
