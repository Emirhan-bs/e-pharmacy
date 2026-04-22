import axiosInstance from "./axiosInstance"

//Register New User
export const register =async (userData) => {
    const response=await axiosInstance.post("/api/user/register", userData);
    return response.data
};

//Login User
export const login=async (credentials) => {
    const response = await axiosInstance.post("/api/user/login", credentials);
    return response.data
};

//Logout User
export const logout=async () => {
    const response=await axiosInstance.get("/api/user/logout");
    localStorage.removeItem("token")
    return response.data;
};

//Get current user info
export const getUserInfo=async () => {
    const response =await axiosInstance.get("/api/user/user-info");
    return response.data
};



