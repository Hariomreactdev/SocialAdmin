import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    //  config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if ([200, 201, 202, 204].includes(response.status)) {
      const method: string = response.config.method?.toLowerCase() || '';
      if (['put', 'post', 'patch', 'delete'].includes(method)) {
        toast.success(response.data?.message || 'Request successful!');
      }
      return response;
    } else {
      toast.error(`Unexpected status code: ${response.status}`);
      return Promise.reject({
        message: `Unexpected status code: ${response.status}`,
        response,
      });
    }
  },
  (error: any) => {
    toast.error(error.response?.data?.message || error.message || 'Something went wrong!');
    return Promise.reject(error);
  },
);

export default axiosInstance;
