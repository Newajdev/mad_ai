import React, { useState, useEffect, useRef } from "react";
import DataTable from "../components/TableComp";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";
import toast from "react-hot-toast";

import { getUsers } from "../api/usersApi";

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUsers();
      hasFetched.current = true;
    }
  }, []);

  const fetchUsers = async () => {
    const toastId = toast.loading("Fetching users...");

    try {
      const result = await getUsers();

      const formatted = result.users.map((user, index) => ({
        name: user.full_name || "N/A",
        avatar: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
        email: user.email,
        address: user.address || "Not provided",
        age: user.age || "N/A",
        diseases: "-",
        medication: "-",
      }));

      setData(formatted);

      toast.success("Users loaded successfully ✅", { id: toastId });
    } catch (error) {
      toast.error("Failed to load users ❌", { id: toastId });
    }
  };

  /* ================= SEARCH ================= */

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= TABLE COLUMNS ================= */

  const columns = [
    {
      header: "User name",
      key: "name",
      render: (name, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0">
            <img
              src={row.avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <span>{name}</span>
        </div>
      ),
    },
    { header: "Email", key: "email" },
    { header: "Address", key: "address" },
    { header: "Age", key: "age" },
    // { header: "Diseases", key: "diseases" },
    // { header: "Active medication", key: "medication" },
  ];

  return (
    <div className="p-4 space-y-8">
      <StatsCom
        title="Total Users"
        value={filteredData.length}
        icon="material-symbols:group-outline"
      />

      <SearchCom
        search={search}
        setSearch={setSearch}
      />

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default Users;
