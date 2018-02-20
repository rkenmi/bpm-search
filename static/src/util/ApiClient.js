import {DEV_URL} from "../config/Api";
import store from "../stores";

export const apiClient = () => {
  const token = store.getState().authReducer.token;

  const params = {
    baseURL: DEV_URL,
    headers: {
      Authorization: 'Token ' + token
    }
  };

  return axios.create(params);
};
