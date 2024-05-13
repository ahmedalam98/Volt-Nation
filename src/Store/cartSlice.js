import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/index";

// get cart from api
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await api.get("/cart");
  return response.data;
});

// add item to cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (productId) => {
    const response = await api.post(`/cart/add/${productId}`);
    return response.data;
  }
);

// decrement item from cart
export const decrementItem = createAsyncThunk(
  "cart/decrementItem",
  async (productId) => {
    const response = await api.patch(`/cart/decrease/${productId}`);
    return response.data;
  }
);

// remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  }
);

// checkout
export const checkout = createAsyncThunk("cart/checkout", async () => {
  const response = await api.post("/cart/check-out");
  return response.data;
});

//  slice for cart

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
      // get cart
      .addCase(getCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.error.message;
      });
    //  increament
    builder
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // decrement
    builder
      .addCase(decrementItem.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(decrementItem.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // remove
    builder
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.error.message;
      });
    // checkout
    builder
      .addCase(checkout.fulfilled, (state) => {
        state.products = [];
      })
      .addCase(checkout.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
