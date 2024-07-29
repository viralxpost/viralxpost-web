import axios from "axios";
import conf from "@/config/config";
import useTokenStore from "@/store";

export interface Tweet {
  _id: string;
  title: string;
  content: string;
}

export interface Thread {
  _id: string;
  title: string;
  content: string;
}

export interface Idea {
  _id: string;
  title: string;
  content: string;
}

const api = axios.create({
  baseURL: conf.backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().token;
    if (token) {
      if (conf.isDevelopment) {
        console.log(token);
      }
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

export const logout = async () => {
  try {
    await api.post("/api/v0/users/logout");
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

export const getAllIdeas = async () => {
  try {
    const response = await api.get("/api/v0/posts/ideas");
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

export const deleteTweet = async (id: string) => {
  try {
    await api.delete(`/api/v0/posts/tweets/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const deleteIdea = async (id: string) => {
  try {
    await api.delete(`/api/v0/posts/ideas/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const deleteThread = async (id: string) => {
  try {
    await api.delete(`/api/v0/posts/threads/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const generateTweet = async (data: {
  title: string;
  tags: string;
  format: string;
  voice: string;
  content?: string;
}) => {
  try {
    const response = await api.post("/api/v0/posts/tweets", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const generateIdea = async (data: {
  title: string;
  tags: string;
  format: string;
  voice: string;
  content?: string;
}) => {
  try {
    const response = await api.post("/api/v0/posts/ideas", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const generateThread = async (data: {
  title: string;
  tags: string;
  format: string;
  voice: string;
  content?: string;
}) => {
  try {
    const response = await api.post("/api/v0/posts/threads", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const createOrder = async (plan: string) => {
  try {
    const response = await api.post("/api/payments/create-order", {
      plan,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const verifyPayment = async (
  orderId: string,
  paymentId: string,
  signature: string
) => {
  try {
    const response = await api.post("/api/payments/verify-payment", {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
