import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "Smith Jaman",
    email: "abcd@gmail.com",
    password: "",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    if (pwd.length < 6) return 1;
    if (pwd.length < 10) return 2;
    return 3;
  };

  const strength = getPasswordStrength(profileData.password);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowConfirmModal(false);
      setShowProfileModal(false);
    }, 1500);
  };

  const getTitle = (path) => {
    switch (path) {
      case "/":
        return "Dashboard Overview";
      case "/users":
        return "Users Management";
      case "/doctors":
        return "Doctors Management";
      case "/pharmacies":
        return "Pharmacies Management";
      case "/notifications":
        return "Notifications Management";
      default: {
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
          <button className="relative rounded-full p-2.5 bg-primary-light text-primary hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer">
            <Icon
              icon="material-symbols:notifications-outline-rounded"
              width="24"
              height="24"
            />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
        </Link>

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowProfileModal(!showProfileModal)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`h-12 w-12 rounded-full border-2 border-white ring-2 ${showProfileModal ? 'ring-primary' : 'ring-primary-light'} overflow-hidden shadow-md group-hover:ring-primary transition-all`}>
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-primary leading-tight">
                {profileData.name}
              </span>
              <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Admin</span>
            </div>
            <Icon
              icon="material-symbols:keyboard-arrow-down-rounded"
              className={`text-primary transition-transform duration-300 ${showProfileModal ? 'rotate-180' : ''}`}
            />
          </div>

          {/* Redesigned Profile Popup Dropdown */}
          {showProfileModal && (
            <div className="absolute right-0 mt-4 z-100 w-85 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="bg-white rounded-4xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Header Section */}
                <div className="relative h-32 bg-primary">
                  <div className="absolute inset-0 bg-linear-to-br from-black/10 to-transparent" />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                        <img
                          src={profileData.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-lg hover:text-primary transition-colors border border-gray-50 scale-90 group-hover:scale-100 duration-200"
                      >
                        <Icon icon="lucide:camera" width="16" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all blur-0 backdrop-blur-md cursor-pointer"
                  >
                    <Icon icon="material-symbols:close-rounded" width="20" />
                  </button>
                </div>

                <div className="pt-14 p-6 space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-black text-primary mb-1">{profileData.name}</h3>
                    <div className="inline-flex items-center px-3 py-1 bg-primary-light/30 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                      Admin Profile Info
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* User Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                      <div className="relative group">
                        <input
                          type="text"
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary/20 transition-all text-gray-700 font-bold"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                      <div className="relative group">
                        <input
                          type="email"
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary/20 transition-all text-gray-700 font-bold"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Password with Visibility Toggle & Strength */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">New Password</label>
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary/20 transition-all text-gray-700 font-bold pr-12"
                          value={profileData.password}
                          onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                        >
                          <Icon icon={showPassword ? "lucide:eye-off" : "lucide:eye"} width="18" />
                        </button>
                      </div>
                      {profileData.password && (
                        <div className="flex gap-1 px-1 pt-1">
                          {[1, 2, 3].map((lvl) => (
                            <div
                              key={lvl}
                              className={`h-1 flex-1 rounded-full transition-all duration-500 ${strength >= lvl
                                ? (strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-orange-400' : 'bg-green-400')
                                : 'bg-gray-100'
                                }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setShowConfirmModal(true)}
                      disabled={isSaving}
                      className="w-full bg-primary text-white py-4 rounded-2xl cursor-pointer font-black shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] text-sm flex items-center justify-center gap-2 group"
                    >
                      {isSaving ? (
                        <Icon icon="line-md:loading-twotone-loop" width="18" />
                      ) : (
                        <Icon icon="lucide:check-circle" width="18" />
                      )}
                      {isSaving ? "Saving..." : "Update Profile"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modern Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl p-10 space-y-8 animate-in zoom-in duration-300 relative">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary-light rounded-3xl flex items-center justify-center text-primary animate-bounce">
                <Icon icon="lucide:save" width="32" />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-black text-gray-800 leading-tight">
                Save Changes?
              </h3>
              <p className="text-sm text-text-muted font-bold">Your profile information will be updated.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50"
              >
                {isSaving ? "Updating..." : "Yes, Save"}
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-50 text-gray-400 py-4 rounded-2xl font-black hover:bg-gray-100 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
