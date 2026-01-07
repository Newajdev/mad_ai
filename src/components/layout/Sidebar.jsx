import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Sidebar({ isOpen, onClose }) {
  const navLinks = [
    {
      name: "Dashboards",
      path: "/",
      icon: "material-symbols:dashboard-outline",
    },
    { name: "Users", path: "/users", icon: "material-symbols:group-outline" },
    {
      name: "Medicines",
      path: "/medicines",
      icon: "material-symbols:medication-outline",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "material-symbols:person-2-outline",
    },
    {
      name: "Pharmacies",
      path: "/pharmacies",
      icon: "material-symbols:local-pharmacy-outline",
    },
    {
      name: "Refill request",
      path: "/refill-requests",
      icon: "material-symbols:sync-alt",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-sidebar-border ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">
          {/* Company Logo */}
          <div className="flex flex-col items-center justify-center py-6 px-6 ">
            <Link to="/" className="flex flex-col items-center gap-2">
              <img className="w-1/2" src="/logo.png" alt="Mad AI Company Logo" />
            </Link>
          </div>

          <div className="h-1 bg-sidebar-border mx-6 mb-6" />

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-4">
            {navLinks.map((item) => {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-text-muted hover:bg-primary-light hover:text-primary"
                    }`
                  }
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                >
                  <Icon icon={item.icon} width="22" height="22" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 space-y-1">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-text-muted transition-all hover:bg-primary-light hover:text-primary">
              <Icon
                icon="material-symbols:logout-rounded"
                width="22"
                height="22"
              />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
