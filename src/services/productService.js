import axios from "axios";
import { handleError } from "../utils/helpers";

const BASE_URL = "https://dummyjson.com/products";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Fetch all products
export const getProducts = async (limit = 30, skip = 0) => {
  try {
    const { data } = await api.get(`?limit=${limit}&skip=${skip}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch Single product
export const getProduct = async (id) => {
  try {
    const { data } = await api.get(`/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

//Search
export const searchProducts = async (query) => {
  try {
    const { data } = await api.get(`/search?q=${encodeURIComponent(query)}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Add product
export const addProduct = async (productData) => {
  try {
    const { data } = await api.post("/add", productData);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const { data } = await api.put(`/${id}`, productData);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const { data } = await api.delete(`/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
