import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchSpaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/spaces`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching spaces from backend:", error);
    throw error;
  }
};

export const reserveSpace = async (spaceId) => {
  try {
    const response = await axios.post(`${API_URL}/user/reserve-space/${spaceId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error reserving space:", error);
    throw error;
  }
};

export const cancelReservation = async (spaceId) => {
  try {
    const response = await axios.post(`${API_URL}/user/cancel-reservation/${spaceId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error canceling reservation:", error);
    throw error;
  }
};
