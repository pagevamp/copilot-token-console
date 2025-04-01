import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = '';
    // Handle specific error status codes
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        message = 'Resource not found'; // TODO: create constant for message
      } else if (status === 500) {
        message = 'Server error';
      }
      console.log({ error });
      message = error.response.data;
    } else {
      message = 'Network error or timeout';
    }

    // Optionally, return a custom error object or message
    return Promise.reject(message);
  }
);

export const getRequest = async (
  url: string,
  headers?: Record<string, any>
) => {
  const data = await axios.get(url, { headers });
  console.log({ data });
  return data.data;
};

export const postRequest = async (
  url: string,
  data: any,
  headers?: Record<string, any>
) => {
  const response = await axios.post(url, data, { headers });
  return response.data;
};

export const deleteRequest = async (
  url: string,
  headers?: Record<string, any>
) => {
  const data = await axiosInstance.delete(url, { headers });
  return data.data;
};
