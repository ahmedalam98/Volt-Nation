import api from "./index";

// Products
export const getProducts = async () => {
  const data = await api.get("/products");
  return data;
};

export const addProduct = async (productData) => {
  const response = await api.post("/products/add", productData);
  return response.data;
};

// Dashboard
export const getStatistics = async () => {
  const data = await api.get("/dashboard/statistics");
  return data;
};

// Categories
export const getCategories = async () => {
  const data = await api.get("/category/all");
  return data;
};

export const updateCategory = async (categoryId, categoryData) => {
  const response = await api.patch(
    `/category/update/${categoryId}`,
    categoryData
  );
  return response.data;
};

export const addCategory = async (categoryData) => {
  const response = await api.post("/category/add", categoryData);
  return response.data;
};

// export const deleteCategory = async (categoryId) => {
//   const data = await api.delete(`/category/${categoryId}`);
//   return data;
// };

// Profile
export const getProfileDetails = async () => {
  const data = await api.get("/user/profile");
  return data;
};

export const patchProfileDetails = async () => {
  const data = await api.patch("/user/details/edit");
  return data;
};
export const getAllOrders = async () => {
  // get data from api
  const data = await api.get("/orders/user");

  return data;
};

export const addToFav = async (id) => {
  // get data from api
  const data = await api.post(`/user/new-favourite/${id}`);

  return data;
};
