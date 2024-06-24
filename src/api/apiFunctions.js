import api from "./index";

export const getProducts = async () => {
  // get data from api
  const data = await api.get("/products");

  return data;
};

export const getCategories = async () => {
  // get data from api
  const data = await api.get("/category/all");

  return data;
};

export const getProfileDetails = async () => {
  // get data from api
  const data = await api.get("/user/profile");

  return data;
};

export const patchProfileDetails = async () => {
  // get data from api
  const data = await api.patch("/user/details/edit");

  return data;
};
