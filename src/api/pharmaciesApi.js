import api from "./axiosInstance";

export const getPharmacies = async () => {
  const res = await api.get("/users/admin/pharmacists/");
  return res.data;
};
