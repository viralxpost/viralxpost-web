import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5513",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/api/v0/users/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const register = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post("/api/v0/users/register", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
