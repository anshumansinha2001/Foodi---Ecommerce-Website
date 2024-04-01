import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const API = import.meta.env.VITE_APP_URI_API;

const axiosSecure = axios.create({
  baseURL: `${API}`,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      try {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        console.error("Error setting up request headers:", error);
        return Promise.reject(error);
      }
    },
    function (error) {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      console.error("Response error:", error);
      const status = error.response.status;
      if (status === 401 || status === 403) {
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
