import { createSlice } from "@reduxjs/toolkit";
import { getProfile, registerUser } from "./users.actions";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    error: null,
    loading: false,
    currentUser: "",
  },
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    logout: (state) => {
      localStorage.removeItem("tokens");
      state.currentUser = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.currentUser = payload.email;
      });
  },
});

export const { setError, logout } = usersSlice.actions;
