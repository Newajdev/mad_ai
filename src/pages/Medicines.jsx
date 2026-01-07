import React, { useState, useRef } from "react";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";
import RowCard from "../components/RowCard";

/* 🔹 INLINE OVERLAY FORM (DUMMY) */
const MedicineFormOverlay = ({ open, anchorRef, onClose }) => {
  if (!open || !anchorRef?.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return (
    <div className="fixed inset-0 z-50">
      {/* transparent overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* form card */}
      <div
        className="absolute bg-white rounded-xl shadow-xl p-6 w-[420px]"
        style={{
          top: rect.bottom + 8,
          left: rect.right - 420,
        }}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Add Medicine</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* dummy form */}
        <form className="space-y-4">

          <div className="space-y-1">
            <label className="text-sm font-medium">Medicine name</label>
            <input
              placeholder="Type medicine name here"
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Medicine Type</label>
            <input
              placeholder="Type your medicine address"
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            <select className="w-full border rounded-lg px-3 py-2 outline-none">
              <option>Active</option>
              <option>Not active</option>
            </select>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

const Medicines = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const addBtnRef = useRef(null);

  const data = [
    {
      name: "Napa Extra",
      type: "Pill",
      generic: "Paracetamol",
      users: 245,
      status: "Active",
    },
    {
      name: "Napa Extra",
      type: "Pill",
      generic: "Paracetamol",
      users: 564,
      status: "Not active",
    },
    {
      name: "Napa Extra",
      type: "Pill",
      generic: "Paracetamol",
      users: 245,
      status: "Active",
    },
    {
      name: "Napa Extra",
      type: "Pill",
      generic: "Paracetamol",
      users: 564,
      status: "Not active",
    },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = data.filter(
    (item) => item.status === "Active"
  ).length;

  return (
    <div className="p-4 space-y-8">
      <StatsCom
        title="Active Medicines"
        value={activeCount}
        icon="material-symbols:medication-outline"
      />

      <SearchCom
        search={search}
        setSearch={setSearch}
        addLabel="Add medicines"
        buttonRef={addBtnRef}
        onAddClick={() => setOpen(true)}
        onFilterClick={() => console.log("Filter clicked")}
      />

      {/* LIST */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <RowCard key={index}>
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.type}</p>
                <p className="text-sm text-gray-500">{item.generic}</p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400">Active users</p>
                <p className="font-semibold">{item.users}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">Medicine</p>
                <p
                  className={
                    item.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {item.status}
                </p>
              </div>
            </RowCard>
          ))
        ) : (
          <p className="text-center text-gray-400 italic">
            No medicines found
          </p>
        )}
      </div>

      {/* 🔥 OVERLAY FORM */}
      <MedicineFormOverlay
        open={open}
        anchorRef={addBtnRef}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Medicines;
