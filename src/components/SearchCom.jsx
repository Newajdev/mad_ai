import { Icon } from "@iconify/react";
import GenderFilter from "../components/GenderFilter";
import ActionButton from "../components/ActionButton";

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
    <div className="
      bg-white
      rounded-xl
      px-4 sm:px-6 md:px-9
      py-5 md:py-9
      flex
      flex-col
      lg:flex-row
      gap-4
      lg:items-center
      lg:justify-between
      shadow
    ">
      
      {/* SEARCH */}
      <div className="
        flex items-center gap-2
        bg-background-main
        px-4 py-3
        rounded-lg
        w-full
        lg:max-w-md
        shadow
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
        
        {/* FILTER (Always visible) */}
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
