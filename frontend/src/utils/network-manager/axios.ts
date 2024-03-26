import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";

export const getRequest = <T>(endPoint: string) => {
  return axios.get<T>(endPoint);
};
