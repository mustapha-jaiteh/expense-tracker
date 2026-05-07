import axiosInstance from "./axiosinstance";
import { API_PATHS } from "./apiPaths";

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("profileImageUrl", imageFile);
    try {
        const response = await axiosInstance.put(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}
