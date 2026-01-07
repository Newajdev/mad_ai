import React, { useState } from "react";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";
import RowCard from "../components/RowCard";

const RefillRequest = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      email: "abcd@gmail.com",
      medicines: [
        "Biscor Tablet 2.5mg",
        "Napa extra 500mg",
        "Fexo…",
      ],
      address: "20 Cooper Square, New York,\nNY 10003, USA",
      quantity: 10,
    },
    {
      email: "abcd@gmail.com",
      medicines: [
        "Biscor Tablet 2.5mg",
        "Napa extra 500mg",
        "Fexo…",
      ],
      address: "20 Cooper Square, New York,\nNY 10003, USA",
      quantity: 10,
    },
    {
      email: "abcd@gmail.com",
      medicines: [
        "Biscor Tablet 2.5mg",
        "Napa extra 500mg",
        "Fexo…",
      ],
      address: "20 Cooper Square, New York,\nNY 10003, USA",
      quantity: 10,
    },
  ];

  const filteredData = data.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-8">
      <StatsCom
        title="Refill Requests"
        value={data.length}
        icon="material-symbols:sync-alt"
      />

      <SearchCom search={search} setSearch={setSearch} />

      <div className="space-y-4">
        {filteredData.map((item, index) => (
          <RowCard key={index}>
            <div>
              <p className="text-xs text-gray-400">User mail address</p>
              <p className="font-semibold">{item.email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Medicines</p>
              {item.medicines.map((med, i) => (
                <p key={i} className="text-sm">
                  {med}
                </p>
              ))}
            </div>

            <div className="max-w-xs">
              <p className="text-xs text-gray-400">Address</p>
              <p className="text-sm whitespace-pre-line">
                {item.address}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Quantity</p>
              <p className="font-semibold">
                {item.quantity} pieces
              </p>
            </div>
          </RowCard>
        ))}
      </div>
    </div>
  );
};

export default RefillRequest;
