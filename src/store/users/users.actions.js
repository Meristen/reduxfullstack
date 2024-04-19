import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../helpers/consts";
import { logout, setError } from "./users.slice";
import { getConfig } from "../../helpers/functions";
import { $axios } from "../../helpers/axios";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (data, { dispatch }) => {
    console.log(data);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirm", data.password_confirm);
    try {
      const { data: result } = await axios.post(
        `${API}/account/register/`,
        formData
      );
      data.navigate("/login");
      return result;
    } catch (error) {
      console.log(error);
      dispatch(setError(Object.values(error.response.data).flat(2)[0]));
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ user, navigate }, { dispatch }) => {
    console.log(user, "actions hello");
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    try {
      const { data } = await axios.post(`${API}/account/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(data));
      dispatch(getProfile());
      navigate("/");
      return data;
    } catch (error) {
      dispatch(setError(Object.values(error.response.data).flat(2)[0]));
    }
  }
);

export const checkAuth = createAsyncThunk(
  "users/checkAuth",
  async (navigate, { dispatch }) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const { data } = await axios.post(
        `${API}/account/token/refresh/`,
        {
          refresh: tokens.refresh,
        },
        getConfig()
      );
      localStorage.setItem(
        "tokens",
        JSON.stringify({ ...tokens, access: data.access })
      );
    } catch (error) {
      alert("Срок вашей сессии истек");
      dispatch(logout());
      navigate("/login");
      console.log(error);
    }
  }
);

export const getProfile = createAsyncThunk("users/getProfile", async () => {
  try {
    const { data } = await $axios.get(`${API}/account/profile`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});
