import { useNavigate } from "react-router-dom";
import BackNextButtons from "../../components/BackNextButtons";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    navigate("/verify-otp");
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
          <h2 className="text-center text-2xl text-primary font-semibold mb-1 pb-4">
            Forgot Password?
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Please enter your email to get verification code
          </p>

          {/* FORM */}
          <form onSubmit={handleContinue} className="space-y-6">
            <div>
              <label className="text-sm text-gray-600 block mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-primary rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md font-medium hover:opacity-90 transition cursor-pointer"
            >
              Continue
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
