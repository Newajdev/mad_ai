// src/api/profileApi.js
import axiosInstance from "./axiosInstance";

/* ================= GET ADMIN PROFILE ================= */
export const getAdminProfileApi = async () => {
  const response = await axiosInstance.get("/users/admin/profile/");
  return response.data;
};

/* ================= UPDATE ADMIN PROFILE ================= */
export const updateAdminProfileApi = async (formData) => {
  // DO NOT manually set Content-Type for FormData
  const response = await axiosInstance.put(
    "/users/admin/profile/",
    formData
  );

  return response.data;
};

/* ================= CHANGE PASSWORD ================= */
export const changeAdminPasswordApi = async ({
  old_password,
  new_password,
  confirm_password,
}) => {
  const response = await axiosInstance.put(
    "/users/admin/password/change/",
    {
      old_password,
      new_password,
      confirm_password,
    }
  );

  return response.data;
};
