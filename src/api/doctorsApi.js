import api from "./axiosInstance";

export const getDoctors = async () => {
  const res = await api.get("/users/admin/doctors/");
  return res.data;
};
