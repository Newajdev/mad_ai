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
        <div className="flex items-center gap-2 sm:gap-3 min-w-40">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-gray-100 shrink-0">
            <img
              src={row.avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="truncate text-sm sm:text-base">{name}</span>
        </div>
      ),
    },
    { header: "Email", key: "email" },
    { header: "Address", key: "address" },
    { header: "Age", key: "age" },
  ];

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 space-y-6 md:space-y-8">

      <StatsCom
        title="Total Users"
        value={filteredData.length}
        icon="material-symbols:group-outline"
      />

      <SearchCom
        search={search}
        setSearch={setSearch}
      />

      <div className="overflow-x-auto rounded-xl">
        <DataTable columns={columns} data={filteredData} />
      </div>

    </div>
  );
};

export default Users;
