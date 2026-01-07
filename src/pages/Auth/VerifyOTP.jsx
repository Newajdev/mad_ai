import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const canResend = timeLeft === 0;
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    // Resend logic here (e.g., API call)
    console.log("Resending OTP...");
    setTimeLeft(60);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp.join(""));
    navigate("/password-changed");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background-main flex flex-col">
      <div className="h-20 bg-primary" />

      {/* LOGIN CARD */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-10">
          <div className="flex flex-col items-center mb-6">
            <img src={"/logo.png"} alt="Logo" />
          </div>

          {/* TITLE */}
          <h2 className="text-center text-2xl text-primary font-semibold mb-1 pb-4">
            Check your Email
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6 pb-4">
            We sent a code to your email address @. Please check your email for
            the 6 digit code.
          </p>

          {/* FORM */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-4 pb-5">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md font-medium hover:opacity-90 transition cursor-pointer"
            >
              Verify
            </button>

            <div className="text-center text-sm text-gray-500">
              {canResend ? (
                <p>
                  You have not received the email?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-primary cursor-pointer font-bold hover:underline"
                  >
                    Resend
                  </button>
                </p>
              ) : (
                <p>
                  Resend code in{" "}
                  <span className="text-primary font-bold">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
