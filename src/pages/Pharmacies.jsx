import React from "react";
import DataTable, { StatusDropdown } from "../components/TableComp";

const Pharmacies = () => {
  const columns = [
    { header: "Pharmacy name", key: "name" },
    {
      header: "Website",
      key: "website",
      render: (url) => (
        <a href={`https://${url}`} className="text-blue-500 underline hover:text-primary transition-colors">
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
      address: "14/C, Banasree, Dhaka",
      status: "Inactive",
    },
    {
      name: "Laz Pharma",
      website: "www.pharma.com",
      address: "14/C, Banasree, Dhaka",
      status: "Banned",
    },
    {
      name: "Zaifa Pharma",
      website: "www.pharma.com",
      address: "14/C, Banasree, Dhaka",
      status: "Active",
    },
  ];

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Pharmacies;
