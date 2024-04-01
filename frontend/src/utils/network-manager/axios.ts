/**
 * Author : Ketul Patel
 * This file contains various utility functions for making API calls using axios
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";

axios.interceptors.request.use(
  (request) => {
    request.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getRequest = <T>(endPoint: string) => {
  return axios.get<T>(endPoint);
};

export function postRequest<T>(
  endPoint: string,
  parameters: any = {},
  header: any = axios.defaults.headers,
  requestConfig: AxiosRequestConfig | undefined = undefined
) {
  // set this to token returned by server after user logs in
  axios.defaults.headers = {
    ...header,
  };

  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios
      .post(endPoint, parameters, requestConfig)
      .then((response: AxiosResponse<T>) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
}
