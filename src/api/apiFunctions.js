import api from "./index";

export const getProducts = async () => {
  // get data from api
  const data = await api.get("/products");

  return data;
};
