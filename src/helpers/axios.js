import axios from "axios";
import { API } from "./consts";
import { useDispatch } from "react-redux";
import { logout } from "../store/users/users.slice";

export const $axios = axios.create();

function HandleLogout() {
  const dispatch = useDispatch();
  dispatch(logout());
}

$axios.interceptors.request.use(async (config) => {
  // config.baseURL = API
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

$axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (tokens) {
        try {
          const { data } = await axios.post(`${API}/account/token/refresh/`, {
            refresh: tokens.refresh,
          });

          localStorage.setItem(
            "tokens",
            JSON.stringify({ ...tokens, access: data.access })
          );
          return $axios.request(originalRequest);
        } catch (error) {
          HandleLogout();
        }
      }
    }
  }
);
