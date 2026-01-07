import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onMenuClick }) {
  const location = useLocation();

  const getTitle = (path) => {
    switch (path) {
      case "/":
        return "Dashboard";
      case "/users":
        return "Users";
      case "/medicines":
        return "Medicines";
      case "/doctors":
        return "Doctors";
      case "/pharmacies":
        return "Pharmacies";
      case "/refill-requests":
        return "Refill Requests";
      case "/notifications":
        return "Notifications";
      case "/settings":
        return "Settings";
      default: {
        // Handle nested paths or strings like "/users/details" by capitalizing bits if needed
        const cleanPath = path.split("/").filter(Boolean)[0];
        return cleanPath
          ? cleanPath.charAt(0).toUpperCase() +
          cleanPath.slice(1).replace("-", " ")
          : "Dashboard";
      }
    }
  };

  const title = getTitle(location.pathname);

  return (
    <header className="sticky top-0 z-10 flex h-24 w-full items-center justify-between bg-transparent px-8 text-text-main">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 hover:bg-primary-light text-primary md:hidden"
        >
          <Icon icon="material-symbols:menu-rounded" width="28" height="28" />
        </button>

        <div className="hidden md:block">
          <h1 className="text-4xl font-bold text-primary mb-1">{title}</h1>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <Link to="/notifications">
          <button className="relative rounded-full p-2.5 bg-primary-light text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
            <Icon
              icon="material-symbols:notifications-outline-rounded"
              width="24"
              height="24"
            />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
        </Link>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full border-2 border-white ring-2 ring-primary-light overflow-hidden shadow-md">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Robert Smith"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="hidden sm:block font-bold text-primary">
            Robert Smith
          </span>
        </div>
      </div>
    </header>
  );
}
