import api from "./index";

export const getProducts = async () => {
  const data = await api.get("/products");
  return data;
};

export const getStatistics = async () => {
  const data = await api.get("/dashboard/statistics");
  return data;
};

export const getCategories = async () => {
  const data = await api.get("/category/all");
  return data;
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await api.patch(
      `/category/update/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error updating category: ${error.message}`);
  }
};

export const deleteCategory = async (categoryId) => {
  const data = await api.delete(`/category/${categoryId}`);
  return data;
};
