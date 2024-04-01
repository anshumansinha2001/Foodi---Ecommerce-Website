import axios from "axios";

const API = import.meta.env.VITE_APP_URI_API;
const axiosPublic = axios.create({
  baseURL: `${API}`,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
