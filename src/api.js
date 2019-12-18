import axios from 'axios';


export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (responce) => responce;
  const onError = (err) => {
    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
