import api from "./index";

export const getProducts = async () => {
  // get data from api
  const data = await api.get("/products");

  return data;
};

// Cart functions

export const getCart = async () => {
  const data = await api.get("/cart");

  return data;
};

export const addItemToCart = async (productId) => {
  const data = await api.post(`/cart/add/${productId}`);

  return data;
};

export const decrementItem = async (productId) => {
  const data = await api.patch(`/cart/decrease/${productId}`);

  return data;
};

export const removeFromCart = async (productId) => {
  const data = await api.delete(`/cart/remove/${productId}`);

  return data;
};

// checkout functions

export const checkout = async () => {
  const data = await api.post("/cart/check-out");

  return data;
};
