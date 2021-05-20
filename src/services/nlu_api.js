import axios from "axios";
import getEnv from "@/config/env";

let api = axios.create({});

api.interceptors.request.use((request) => {
  request.baseURL = getEnv("VUE_APP_NLU_API") + 1 + "/";

  let api_key = 'gAAAAABgbpvhQo8RhOWQrtaFHfc9a9RDMKwhI5Oyg9yyiHFNDPqZVavgVBpyDroD-qV9UTHKlzuKKscVioCH1nhWZ4yT6pYwtwwYgA5DSJOWzLxtBUTI5aMjadJY2x0CY6WRj2G4wuAQ'
  if (api_key !== "") {
    request.headers["Authorization"] = `${api_key}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
