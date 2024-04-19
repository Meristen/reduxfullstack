import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getOneProduct, getProducts } from "./products.actions";

const INIT_STATE = {
  products: [],
  oneProduct: null,
  categories: [],
  loading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState: INIT_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload?.results;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.results;
      })
      .addCase(getOneProduct.fulfilled, (state, { payload }) => {
        state.oneProduct = payload;
      });
  },
});
