import axiosInstance from './axiosInstance';

//Get all medicines
export const getMedicines = async (params) => {
    const response = await axiosInstance.get("/api/products", {params});
    return response.data; 
};

//Get single medicine
export const getMedicineById = async (id) => {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
};

//Add new medicine
export const addMedicine = async (medicineData) => {
    const response=await axiosInstance.post("/api/products", medicineData );
    return response.data;
};

//Edit medicine
export const editMedicine=async (id, medicineData) => {
    const response = await axiosInstance.put(`/api/products/${id}`, medicineData);
    return response.data;

};

//Delete medicine
export const deleteMedicine = async (id) => {
    const response =await axiosInstance.delete(`/api/products/${id}`);
    return response.data
};





