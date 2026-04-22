import axiosInstance from "./axiosInstance"



//Get dashboard statistics
export const getStatistics=async () => {
    const response = await axiosInstance.get("/api/dashboard");
    return response.data;
};


//Get customer details
export const getCustomerDetails=async (customerId) => {
    const response=await axiosInstance.get(`/api/customers/${customerId}`);
    return response.data;
};

