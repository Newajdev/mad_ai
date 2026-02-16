import React, { useState, useRef, useEffect } from "react";
import DataTable from "../components/TableComp";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";
import toast from "react-hot-toast";

import { getPharmacies } from "../api/pharmaciesApi";

const Pharmacies = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const addBtnRef = useRef(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchPharmacies();
      hasFetched.current = true;
    }
  }, []);

  const fetchPharmacies = async () => {
    const toastId = toast.loading("Fetching pharmacies...");

    try {
      const result = await getPharmacies();

      const formatted =
        result?.pharmacies?.map((item) => ({
          name: item?.pharmacy_name || "N/A",
          website: item?.website_link
            ? item.website_link.replace(/^https?:\/\//, "")
            : "",
          address: item?.Pharmacy_Address || "N/A",
        })) || [];

      setData(formatted);

      setTotal(
        result?.total_pharmacies ||
          result?.pharmacies?.length ||
          0
      );

      toast.success("Pharmacies loaded successfully ✅", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to fetch pharmacies ❌", {
        id: toastId,
      });
    }
  };

  /* ================= SEARCH ================= */

  const filteredData = data.filter((pharmacy) =>
    pharmacy?.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= TABLE ================= */

  const columns = [
    { header: "Pharmacy name", key: "name" },
    {
      header: "Website",
      key: "website",
      render: (url) =>
        url ? (
          <a
            href={`https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-primary break-all"
          >
            {url}
          </a>
        ) : (
          "N/A"
        ),
    },
    { header: "Address", key: "address" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      <StatsCom
        title="Total Pharmacies"
        value={total}
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

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default Pharmacies;
