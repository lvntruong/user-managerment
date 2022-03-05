import axios from "axios";
import storeLocal from "../utils/storeLocal";
import { errorHandler, successHandler } from "./handleReponse";

const headersInstance = { Authorization: "Bearer " + storeLocal.get("token") };

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: {
    ...headersInstance,
  },
});

const request = {
  create: async (entity, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.post(entity + "/create", jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async (entity, id) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entity + "/read/" + id);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async (entity, id, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(
        entity + "/update/" + id,
        jsonData
      );
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async (entity, id, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.delete(entity + "/delete/" + id);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async (entity, option = {}) => {
    axiosInstance.defaults.headers = {
      Authorization: "Bearer " + storeLocal.get("token"),
    };
    try {
      let query = "";
      if (option !== {}) {
        let page = option.page ? "page=" + option.page : "";
        let items = option.items ? "&items=" + option.items : "";
        query = `?${page}${items}`;
      }

      const response = await axiosInstance.get(entity + "/list" + query);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  post: async (entityUrl, jsonData, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.post(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async (entityUrl) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entityUrl);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async (entityUrl, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  source: () => {
    // const CancelToken = await axiosInstance.CancelToken;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
};
export default request;
