import React, { useState, useRef } from "react";
import DataTable, { StatusDropdown } from "../components/TableComp";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";


const DynamicFormOverlay = ({ open, anchorRef, onClose, title }) => {
  const overlayRef = useRef(null);

  if (!open || !anchorRef?.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return (
    <div className="fixed inset-0 z-50">

      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={overlayRef}
        className="absolute bg-white rounded-xl shadow-xl px-8 py-8 w-[420px]"
        style={{
          top: rect.bottom + 8,
          left: rect.right - 420,
        }}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Pharmacy Name
          </label>
          <input
            type="text"
            placeholder="Type pharmacy name here"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Pharmacy Address
            </label>
            <input
              type="text"
              placeholder="Type pharmacy name address"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Website URL(order page URL)
            </label>
            <input
              type="text"
              placeholder="Please enter the website URL"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

const Pharmacies = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const addBtnRef = useRef(null);

  const columns = [
    { header: "Pharmacy name", key: "name" },
    {
      header: "Website",
      key: "website",
      render: (url) => (
        <a
          href={`https://${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-primary"
        >
          {url}
        </a>
      ),
    },
    { header: "Address", key: "address" },
    {
      header: "Status",
      key: "status",
      render: (status) => <StatusDropdown value={status} />,
    },
  ];

  const data = [
    {
      name: "Laz Pharma",
      website: "www.pharma.com",
      address: "14/C, Banasree, Dhaka",
      status: "Active",
    },
    {
      name: "Desh Pharma",
      website: "www.pharma.com",
      address: "Mirpur, Dhaka",
      status: "Inactive",
    },
    {
      name: "Zaifa Pharma",
      website: "www.pharma.com",
      address: "Uttara, Dhaka",
      status: "Active",
    },
    {
      name: "Desh Pharma",
      website: "www.pharma.com",
      address: "Mirpur, Dhaka",
      status: "Inactive",
    },
    {
      name: "Zaifa Pharma",
      website: "www.pharma.com",
      address: "Uttara, Dhaka",
      status: "Active",
    },
  ];

  return (
    <div className="p-4 space-y-8">
      <StatsCom
        title="Total Pharmacies"
        value={data.length}
        icon="material-symbols:local-pharmacy-outline"
      />

      <SearchCom
        search={search}
        setSearch={setSearch}
        addLabel="Add pharmacy"
        buttonRef={addBtnRef}
        onAddClick={() => setOpen(true)}
        onFilterClick={() => console.log("Filter clicked")}
      />

      <DataTable columns={columns} data={data} />

      <DynamicFormOverlay
        open={open}
        anchorRef={addBtnRef}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Pharmacies;
