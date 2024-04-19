import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig } from "../../helpers/functions";
import { API } from "../../helpers/consts";
import { $axios } from "../../helpers/axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      // console.log("hello");
      const { data } = await $axios.get(
        `${API}/products/${window.location.search}`
      );
      return data;
    } catch (error) {
      // console.log(error);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async (id) => {
    try {
      // console.log("hello");
      const { data } = await $axios.get(`${API}/products/${id}/`);
      return data;
    } catch (error) {
      // console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, product }) => {
    try {
      await $axios.patch(`${API}/products/${id}/`, product);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    try {
      console.log("adding_console");
      await $axios.post(`${API}/products/`, product);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch }) => {
    try {
      await $axios.delete(`${API}/products/${id}/`);
      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    try {
      const { data } = await $axios.get(`${API}/category/list/`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createComment = createAsyncThunk(
  "products/createComment",
  async (commentObj, { dispatch }) => {
    try {
      await $axios.post(`${API}/reviews/`, commentObj);
      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "products/deleteComment",
  async (id, { dispatch }) => {
    try {
      await $axios.delete(`${API}/reviews/${id}/`);
      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const toggleLike = createAsyncThunk(
  "products/toggleLike",
  async (id, { dispatch }) => {
    try {
      await $axios.get(`${API}/products/${id}/toggle_like/`);
      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }
);
