import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/auth.constant";
import { readLocalStorage, writeLocalStorage } from "../helpers/localStorage";

let isRefreshing = false;
let failedQueue = [];

/**
 *
 * @param {*} error
 * @param {*} token
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const instance = axios.create();

instance.defaults.timeout = 2500000;
instance.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    let originalRequest = error.config;
    if (error.response.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      const refreshToken = readLocalStorage(REFRESH_TOKEN);
      return new Promise((resolve, reject) => {
        axios
          .post(
            "/api/v1/auth/refresh",
            {
              refreshToken,
            },
            {
              baseURL: process.env.REACT_APP_BASE_URL || "",
            }
          )
          .then((res) => {
            // TODO: khi nào có api refresh token thì chỉnh sửa lại
            const accessToken = res.access_token;
            const refrToken = res.refresh_token;

            writeLocalStorage(ACCESS_TOKEN, accessToken);
            writeLocalStorage(REFRESH_TOKEN, refrToken);

            originalRequest.headers["Authorization"] = "Bearer " + accessToken;
            processQueue(null, accessToken);
            resolve(instance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error.response);
  }
);

const setRequestParams = (url, params) => {
  if (typeof params === "object" && params !== null) {
    const keyParams = Object.keys(params);
    const arrayParams = [];
    for (const key of keyParams) {
      const param = key + "=" + params[key];
      arrayParams.push(param);
    }
    if (Array.isArray(arrayParams) && arrayParams.length) {
      url = url + "?" + arrayParams.join("&");
    }
  }
  return url;
};

export const request = ({
  method,
  url,
  data,
  isAuthRequest,
  params,
  headers = {},
}) => {
  return new Promise((resolve, reject) => {
    if (isAuthRequest) {
      const accessToken = readLocalStorage(ACCESS_TOKEN);
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // set request params
    url = setRequestParams(url, params);

    instance({
      method,
      url,
      data,
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
