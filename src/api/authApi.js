import api from "./axiosInstance";

/* ================= LOGIN ================= */
export const loginUser = async (credentials) => {
  const res = await api.post("/users/login/", credentials);
  return res.data;
};

/* ================= REGISTER ================= */
export const registerUser = async (data) => {
  const res = await api.post("/users/register/", data);
  return res.data;
};

/* ================= OTP REQUEST (Forgot Password / Signup) ================= */
export const requestOtp = async (data) => {
  const res = await api.post("/users/otp/request/", data);
  return res.data;
};

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (data) => {
  const res = await api.post("/users/otp/verify/", data);
  return res.data;
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (data) => {
  const res = await api.post("/users/password/reset/", data);
  return res.data;
};

/* ================= LOGOUT ================= */
export const logoutUser = async () => {
  const res = await api.post("/users/logout/");
  return res.data;
};
