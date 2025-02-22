import axios from "axios";
import { Urls } from "./url";

export const ApiHelpers = {
  get: async ({
    url,
    params,
    successCallback,
    errorCallback,
  }: {
    url: string;
    params?: any;
    successCallback: (response: any) => void;
    errorCallback: (error: any) => void;
  }) => {
    try {
      const fullUrl = `${Urls.base}${url}`;
      const res = await axios.get(fullUrl, { params });
      console.log("GET request success", res);
      successCallback(res);
    } catch (error) {
      console.log("GET request failed", error);
      errorCallback(error);
    }
  },
  post: async ({
    url,
    data,
    successCallback,
    errorCallback,
  }: {
    url: string;
    data?: any;
    successCallback: (response: any) => void;
    errorCallback: (error: any) => void;
  }) => {
    try {
      const fullUrl = `${Urls.base}${url}`;
      const res = await axios.post(fullUrl, data);
      console.log("POST request success", res);
      successCallback(res);
    } catch (error) {
      console.log("POST request failed", error);
      errorCallback(error);
    }
  },
  put: async ({
    url,
    data,
    successCallback,
    errorCallback,
  }: {
    url: string;
    data?: any;
    successCallback: (response: any) => void;
    errorCallback: (error: any) => void;
  }) => {
    try {
      const fullUrl = `${Urls.base}${url}`;
      const res = await axios.put(fullUrl, data);
      console.log("PUT request success", res);
      successCallback(res);
    } catch (error) {
      console.log("PUT request failed", error);
      errorCallback(error);
    }
  },
  delete: async ({
    url,
    successCallback,
    errorCallback,
  }: {
    url: string;
    successCallback: (response: any) => void;
    errorCallback: (error: any) => void;
  }) => {
    try {
      const fullUrl = `${Urls.base}${url}`;
      const res = await axios.delete(fullUrl);
      console.log("DELETE request success", res);
      successCallback(res);
    } catch (error) {
      console.log("DELETE request failed", error);
      errorCallback(error);
    }
  },
};
