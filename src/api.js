import axios from 'axios';


const HTTP_CODE_FORBIDDEN = 401;
const HTTP_CODE_BAD_REQUEST = 400;

const checkRequest = function (config) {
  return config.method === `get` && config.url.endsWith(`/login`);
};

export const createAPI = (logout) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (responce) => responce;
  const onError = (err) => {
    if (!checkRequest(err.config) && err.status && err.status === HTTP_CODE_FORBIDDEN) {
      logout();
      throw new Error(`Ошибка. Данное действие доступно только для авторизованных пользователей`);
    }

    if (err.status && err.status === HTTP_CODE_BAD_REQUEST) {
      throw new Error(err.status && err.status.error);
    }

    throw new Error(`Произошла ошибка. Проверьте ваше подключение к сети`);
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
