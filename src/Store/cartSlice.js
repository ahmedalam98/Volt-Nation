import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/index";

// functions

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await api.get("/cart");
  return response.data;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (productId) => {
    const response = await api.post(`/cart/add/${productId}`);
    return response.data;
  }
);

export const decrementItem = createAsyncThunk(
  "cart/decrementItem",
  async (productId) => {
    const response = await api.patch(`/cart/decrease/${productId}`);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  }
);

export const checkout = createAsyncThunk("cart/checkout", async () => {
  const response = await api.post("/cart/check-out");
  return response.data;
});

//  slice

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        console.log("action payload", action.payload);
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //  increament
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        console.log("add to cart", action.payload);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // decrement
    builder
      .addCase(decrementItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(decrementItem.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(decrementItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // remove
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // clean cart     **** remove it
    builder
      .addCase(checkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [];
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
