import React, { useState, useRef } from "react";
import DataTable, { StatusDropdown } from "../components/TableComp";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";

const DoctorFormOverlay = ({ open, anchorRef, onClose }) => {
  if (!open || !anchorRef?.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return (
    <div className="fixed inset-0 z-50">

      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="absolute bg-white rounded-xl shadow-xl p-6 w-[420px]"
        style={{
          top: rect.bottom + 8,
          left: rect.right - 420,
        }}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Add Doctor</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>


        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Doctor Name</label>
            <input
              placeholder="Type doctor name here"
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Sex</label>
            <select className="w-full border rounded-lg px-3 py-2 outline-none">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Specialization</label>
            <input
              placeholder="Type your pharmacy address"
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Email Address</label>
            <input
              placeholder="Please enter the Email address"
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Hospital Name</label>
            <input
              placeholder="Please enter the website URL"
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
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

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const addBtnRef = useRef(null);

  const columns = [
    { header: "Doctor name", key: "name" },
    { header: "Specialization", key: "specialization" },
    { header: "Gender", key: "gender" },
    { header: "Hospital", key: "hospital" },
    {
      header: "Status",
      key: "status",
      render: (status) => <StatusDropdown value={status} />,
    },
  ];

  const data = [
    {
      name: "Dr. Roy",
      specialization: "Cardiologist",
      gender: "Male",
      hospital: "Lab Aid Hospital",
      status: "Active",
    },
    {
      name: "Dr. Sawly",
      specialization: "Neurologist",
      gender: "Female",
      hospital: "Islami Bank Hospital",
      status: "Active",
    },
    {
      name: "Dr. Dina",
      specialization: "Psychiatrist",
      gender: "Female",
      hospital: "Farazi Hospital",
      status: "Active",
    },
    {
      name: "Dr. Hasan",
      specialization: "Oncologist",
      gender: "Male",
      hospital: "Islami Bank Hospital",
      status: "Active",
    },
  ];

  return (
    <div className="p-4 space-y-8">
      <StatsCom
        title="Total Doctors"
        value={data.length}
        icon="material-symbols:person-outline"
      />

      <SearchCom
        search={search}
        setSearch={setSearch}
        addLabel="Add doctor"
        buttonRef={addBtnRef}
        onAddClick={() => setOpen(true)}
        onFilterClick={() => console.log("Filter clicked")}
      />

      <DataTable columns={columns} data={data} />

      <DoctorFormOverlay
        open={open}
        anchorRef={addBtnRef}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Doctors;
