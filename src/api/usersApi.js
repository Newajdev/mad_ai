import api from "./axiosInstance";

export const getUsers = async () => {
  const res = await api.get("/users/admin/users/");
  return res.data;
};
