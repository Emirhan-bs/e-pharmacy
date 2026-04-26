import axiosInstance from "./axiosInstance";

//Register New User
export const register = async (userData) => {
  const response = await axiosInstance.post("/api/user/register", userData);
  return response.data;
};

//Login User
export const login = async (credentials) => {
  const response = await axiosInstance.post("/api/user/login", credentials);
  return response.data;
};

//Logout User
export const logout = async () => {
  const response = await axiosInstance.post("/api/user/logout");
  localStorage.removeItem("token");
  return response.data;
};

//Get current user info
export const getUserInfo = async () => {
  const response = await axiosInstance.get("/api/user/current");
  return response.data;
};

export const createShop = async (shopData) => {
  const response = await axiosInstance.post("/api/pharmacies", shopData);
  return response.data;
};

export const getShop = async () => {
  const response = await axiosInstance.get("/api/pharmacies/my");
  return response.data;
};

export const updateShop = async (shopData) => {
  const response = await axiosInstance.put("/api/pharmacies/my", shopData);
  return response.data;
};