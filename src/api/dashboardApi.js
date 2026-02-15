import api from "./axiosInstance";

export const getDashboard = async () => {
  const res = await api.get("/users/admin/dashboard/");
  return res.data;
};
