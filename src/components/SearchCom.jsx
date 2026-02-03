import { Icon } from "@iconify/react";
import GenderFilter from "../components/GenderFilter";
import ActionButton from "../components/ActionButton"; // ✅ IMPORT

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
    <div className="bg-white rounded-xl px-7 py-7 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 bg-background-main px-4 py-1 rounded-lg flex-1">
        <Icon icon="material-symbols:search-rounded" width="28" height="28" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <GenderFilter value={gender} onChange={setGender} />

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
