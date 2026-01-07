import React from "react";
import DataTable, { StatusDropdown } from "../components/TableComp";

const Doctors = () => {
  const columns = [
    { header: "Doctor name", key: "name" },
    { header: "Email", key: "email" },
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
      email: "abc@gmail.com",
      specialization: "Cardiologist",
      gender: "Male",
      hospital: "Lab Aid Hospital",
      status: "Active",
    },
    {
      name: "Dr. Sawly",
      email: "abc@gmail.com",
      specialization: "Neurologist",
      gender: "Female",
      hospital: "Islami Bank Hospital",
      status: "Active",
    },
    {
      name: "Dr. Dina",
      email: "abc@gmail.com",
      specialization: "Psychiatrist",
      gender: "Female",
      hospital: "Farazi Hospital",
      status: "Active",
    },
    {
      name: "Dr. Hasan",
      email: "abc@gmail.com",
      specialization: "Oncologist",
      gender: "Male",
      hospital: "Islami Bank Hospital",
      status: "Active",
    },
  ];

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Doctors;
