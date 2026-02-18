import { Icon } from "@iconify/react";
import FilterDropdown from "../components/FilterDropdown";
import ActionButton from "../components/ActionButton";

export default function SearchCom({
  search,
  setSearch,
  filterValue,
  onFilterChange,
  filterOptions = [],
  filterPlaceholder = "Filter",
  onAddClick,
  addLabel,
  buttonRef,
}) {
  return (
    <div className="
      bg-white
      rounded-xl
      px-6 sm:px-5 md:px-8
      py-6 md:py-8
      flex
      flex-col
      lg:flex-row
      gap-4
      lg:items-center
      lg:justify-between
      shadow border border-primary/30
    ">

      {/* SEARCH */}
      <div className="
        flex items-center gap-2
        bg-background-main
        px-4 py-3
        rounded-lg
        w-full
        lg:max-w-md
        shadow border border-primary/40
      ">
        <Icon
          icon="material-symbols:search-rounded"
          width="22"
          height="22"
          className="text-gray-500 shrink-0"
        />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="
        flex
        flex-wrap
        items-center
        gap-3 sm:gap-4
        w-full
        lg:w-auto
        justify-start lg:justify-end
      ">

        {filterOptions.length > 0 && (
          <FilterDropdown
            value={filterValue}
            onChange={onFilterChange}
            options={filterOptions}
            placeholder={filterPlaceholder}
          />
        )}

        {onAddClick && (
          <ActionButton
            label={addLabel}
            onClick={onAddClick}
            buttonRef={buttonRef}
          />
        )}
      </div>

    </div>
  );
}
