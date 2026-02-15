import React, { useState, useRef, useEffect } from "react";
import DataTable, { StatusDropdown } from "../components/TableComp";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Pharmacies = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const addBtnRef = useRef(null);
  const hasFetched = useRef(false); // ✅ StrictMode guard

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!hasFetched.current) {
      fetchPharmacies();
      hasFetched.current = true;
    }
  }, []);

  const fetchPharmacies = async () => {
    const toastId = toast.loading("Fetching pharmacies...");

    try {
      const response = await fetch(
        `${BASE_URL}/users/admin/pharmacists/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        const formatted = result.pharmacies.map((item) => ({
          name: item.pharmacy_name,
          website: item.website_link.replace(/^https?:\/\//, ""),
          address: item.Pharmacy_Address,
          status: "Active",
        }));

        setData(formatted); // ✅ replace (not append)
        setTotal(result.total_pharmacies);

        toast.success("Pharmacies loaded successfully ✅", {
          id: toastId,
        });
      } else {
        toast.error("Failed to fetch pharmacies ❌", {
          id: toastId,
        });
        console.error(result);
      }
    } catch (error) {
      toast.error("Server error while fetching pharmacies ❌", {
        id: toastId,
      });
      console.error("Fetch Error:", error);
    }
  };

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

  return (
    <div className="p-4 space-y-8">
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

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Pharmacies;
