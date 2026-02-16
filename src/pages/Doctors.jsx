import React, { useState, useRef, useEffect } from "react";
import DataTable from "../components/TableComp";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";
import toast from "react-hot-toast";

import { getDoctors } from "../api/doctorsApi";

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const addBtnRef = useRef(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchDoctors();
      hasFetched.current = true;
    }
  }, []);

  const fetchDoctors = async () => {
    const toastId = toast.loading("Fetching doctors...");

    try {
      const result = await getDoctors();

      const formatted = result?.doctors?.map((doc) => ({
        name: doc?.name || "N/A",
        email: doc?.doctor_email || "N/A",
        specialization: doc?.specialization || "N/A",
        gender: doc?.sex || "N/A",
        hospital: doc?.hospital_name || "N/A",
        // status: "Active",
      })) || [];

      setData(formatted);

      toast.success("Doctors loaded successfully ✅", { id: toastId });
    } catch (error) {
      toast.error("Failed to load doctors ❌", { id: toastId });
    }
  };

  /* ================= SEARCH ================= */

  const filteredData = data.filter((doctor) =>
    doctor?.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= TABLE ================= */

  const columns = [
    { header: "Doctor name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Specialization", key: "specialization" },
    { header: "Gender", key: "gender" },
    { header: "Hospital", key: "hospital" },
    // {
    //   header: "Status",
    //   key: "status",
    //   render: (status) => <StatusDropdown value={status} />,
    // },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      <StatsCom
        title="Total Doctors"
        value={filteredData.length}
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

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default Doctors;
