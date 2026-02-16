
/* ================= TABLE COMPONENT ================= */
export default function TableComp({ columns, data, className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block rounded-2xl shadow-sm bg-white overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left min-w-200">
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
                      className={`px-6 py-4 text-sm font-medium text-text-main truncate
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
              className="bg-white rounded-2xl shadow-sm p-4 space-y-3 border border-gray-100"
            >
              {columns.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="text-xs font-semibold text-gray-400">
                    {column.header}
                  </span>

                  <span className="text-sm font-medium text-text-main text-right break-words-word max-w-[60%]">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-text-muted italic border border-gray-100">
            No data found.
          </div>
        )}
      </div>
    </div>
  );
}
