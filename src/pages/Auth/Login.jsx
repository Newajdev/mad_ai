import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background-main flex flex-col">
      <div className="h-20 bg-primary" />

      {/* LOGIN CARD */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-10">
          <div className="flex flex-col items-center mb-6">
            <img src={"/logo.png"} alt="" />
          </div>

          {/* TITLE */}
          <h2 className="text-center text-primary text-2xl font-semibold mb-1 pb-2">
            Login to Account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Please enter your email and password to continue
          </p>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-primary rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border border-primary rounded-md px-3 py-3 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="cursor-pointer accent-primary"
                />
                Remember Password
              </label>

              <Link
                to="/forgot-password"
                className="text-gray-500 underline hover:text-primary"
              >
                Forget Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md font-medium hover:opacity-90 transition cursor-pointer"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
