
import DataTable from "../components/TableComp";
import StatsCom from "../components/StatsCom";
import SearchCom from "../components/SearchCom";

const Users = () => {
  const columns = [
    {
      header: "User name",
      key: "name",
      render: (name, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0">
            <img src={row.avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          <span>{name}</span>
        </div>
      ),
    },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
    { header: "Address", key: "address" },
    { header: "Age", key: "age" },
    { header: "Diseases", key: "diseases" },
    { header: "Active medication", key: "medication" },
  ];

  const data = [
    {
      name: "John Miller",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      email: "abcd******@gmail.com",
      phone: "+123456789",
      address: "20 Cooper Sq...",
      age: 40,
      diseases: "coronary, Di...",
      medication: 2,
    },
    {
      name: "John Miller",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      email: "abcd******@gmail.com",
      phone: "+123456789",
      address: "20 Cooper Sq...",
      age: 41,
      diseases: "coronary, Di...",
      medication: 3,
    },
    {
      name: "John Miller",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      email: "abcd******@gmail.com",
      phone: "+123456789",
      address: "20 Cooper Sq...",
      age: 50,
      diseases: "coronary, Di...",
      medication: 2,
    },
    {
      name: "John Miller",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "abcd******@gmail.com",
      phone: "+123456789",
      address: "20 Cooper Sq...",
      age: 52,
      diseases: "coronary, Di...",
      medication: 4,
    },
    
  
  ];

  return (
  <div className="p-4 space-y-8">
    <StatsCom
      title="Total Users"
      value={data.length}
      icon="material-symbols:group-outline"
    />

    <SearchCom />

    <DataTable columns={columns} data={data} />
  </div>
);
};

export default Users;
