import { useState, useCallback } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 20000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export function useAxios() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api(config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const msg = err.response?.data || err.message;
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
}

// ejm como usar
// const login = async () => {
//   const result = await request({
//     method: "POST",
//     url: "/login",
//     data: {
//       email: "test@test.com",
//       password: "123456"
//     }
//   });

//   console.log("Respuesta:", result);
// };

// const { data, error, loading, request } = useAxios();
// const uploadPhoto = async (file) => {
//   const form = new FormData();
//   form.append("photo", file);

//   await request({
//     method: "POST",
//     url: "/upload",
//     data: form,
//     headers: {
//       "Content-Type": "multipart/form-data"
//     }
//   });
// };