import config from "@/config/config";
import useTokenStore from "@/store";
import axios from "axios";

export interface Tweet {
  id: string;
  title: string;
  content: string;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
}

const api = axios.create({
  baseURL: config.backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().token;
    if (token) {
      console.log(token);

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
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

export const getAllTweets = async () => {
  try {
    const response = await api.get("/api/v0/posts/tweets");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const getAllThreads = async () => {
  try {
    const response = await api.get("/api/v0/posts/threads");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
