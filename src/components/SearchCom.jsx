import { Icon } from "@iconify/react";
import GenderFilter from "../components/GenderFilter";

export default function SearchCom({
  search,
  setSearch,
  gender,
  setGender,
  onAddClick,
  addLabel,
  buttonRef,
}) {
  return (
    <div className="bg-white rounded-xl px-7 py-7 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between relative z-40 pointer-events-auto overflow-visible">


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
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4">

        {/* GENDER FILTER */}
        <GenderFilter value={gender} onChange={setGender} />

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
