import { Icon } from "@iconify/react";

export default function SearchCom({
  search,
  setSearch,
  onFilterClick,
  onAddClick,
  addLabel,
  buttonRef,
}) {
  return (
    <div className="bg-white rounded-xl px-7 py-7 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-background-main px-4 py-3 rounded-lg flex-1">
        <Icon
          icon="material-symbols:search-rounded"
          width="28"
          height="28"
        />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch?.(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4">

        {/* FILTER */}
        <button
          onClick={onFilterClick}
          className="flex items-center gap-2 text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary-light transition"
        >
          <Icon
            icon="material-symbols:filter-list-rounded"
            width="26"
            height="26"
          />
          Filter
        </button>

        {/* ADD BUTTON */}
        {onAddClick && (
          <button
            ref={buttonRef}
            onClick={onAddClick}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold whitespace-nowrap"
          >
            {addLabel}
          </button>
        )}

      </div>
    </div>
  );
}
