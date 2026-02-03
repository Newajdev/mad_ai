import React from "react";
import DataTable, { StatusDropdown } from "../components/TableComp";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";

const Doctors = () => {
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

    <SearchCom/>

    <DataTable columns={columns} data={data} />
  </div>
);

};

export default Doctors;
