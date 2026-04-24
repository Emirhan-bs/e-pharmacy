import axiosInstance from "./axiosInstance"



//Get dashboard statistics
export const getDashboard = async () => {
  const response = await axiosInstance.get("/api/dashboard");
  return response.data;
};

//Get customer details
export const getCustomers = async () => {
  const response = await axiosInstance.get("/api/customers");
  return response.data;
};
