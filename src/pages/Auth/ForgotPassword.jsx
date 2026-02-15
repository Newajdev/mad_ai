import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import BackNextButtons from "../../components/BackNextButtons";

import { requestOtp } from "../../api/authApi";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;

    try {
      const data = await requestOtp({
        email,
        purpose: "password_reset",
      });

      toast.success(data.message || "OTP sent successfully ✅");

      localStorage.setItem("resetEmail", email);

      navigate("/verify-otp");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-main flex flex-col">
      <div className="h-20 bg-primary" />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-10">
          <div className="flex flex-col items-center mb-6">
            <img src={"/logo.png"} alt="" />
          </div>

          <h2 className="text-center text-2xl text-primary font-semibold mb-1 pb-4">
            Forgot Password?
          </h2>

          <p className="text-center text-sm text-gray-500 mb-6">
            Please enter your email to get verification code
          </p>

          <form onSubmit={handleContinue} className="space-y-6">
            <div>
              <label className="text-sm text-gray-600 block mb-2">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full border border-primary rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-primary text-white py-3 rounded-md font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>

            <BackNextButtons
              backLabel="Back"
              nextLabel="Next"
              onBack={() => navigate("/login")}
              onNext={() => navigate("/verify-otp")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
