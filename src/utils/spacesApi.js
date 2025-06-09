import axios from "axios";
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchSpaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/spaces`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching spaces from backend:", error);
    toast.error('Failed to fetch parking spaces. Please try again.');
    throw error;
  }
};

export const reserveSpace = async (spaceId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/user/reserve-space/${spaceId}`, {userId}, { withCredentials: true });
    toast.success('Space reserved successfully!');
    return response.data;
  } catch (error) {
    console.error("Error reserving space:", error);
    toast.error('Failed to reserve the space. Please try again.');
    throw error;
  }
};

export const cancelReservation = async (spaceId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/user/cancel-reservation/${spaceId}`, {userId}, { withCredentials: true });
    toast.success('Reservation canceled successfully!');
    return response.data;
  } catch (error) {
    console.error("Error canceling reservation:", error);
    toast.error('Failed to cancel the reservation. Please try again.');
    throw error;
  }
};
