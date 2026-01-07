import React, { useState } from "react";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";
import RowCard from "../components/RowCard";

const Medicines = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "Napa Extra",
      type: "Pill",
      generic: "Paracetamol",
      users: 145,
      status: "Active",
    },
    {
      name: "Napa Extra",
      type: "Pill",
      generic: "Paracetamol",
      users: 145,
      status: "Active",
    },
    {
      name: "Napa Extra",
      type: "Pill",
      generic: "Paracetamol",
      users: 145,
      status: "Active",
    },
    {
      name: "Napa Extra",
      type: "Pill",
      generic: "Paracetamol",
      users: 145,
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

      <SearchCom search={search} setSearch={setSearch} />

      {/* List */}
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
    </div>
  );
};

export default Medicines;
