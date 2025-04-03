import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import api from "../assets/interceptor";

const API_URL = "http://localhost:8080/api/admin";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  },
  role: user ? JSON.parse(user).role : null // Aquí extraes el rol del usuario
};

// Obtener todos los productos
export const getProducts = createAsyncThunk("admin/getProducts", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Crear un nuevo producto
export const createProduct = createAsyncThunk("admin/createProduct", async (productData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/products`, productData, config);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Actualizar un producto
export const updateProduct = createAsyncThunk("admin/updateProduct", async (productData, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_URL}/products/${productData.id}`, productData, config);
    console.log(res.data);
    return res.data;
    
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Eliminar un producto
export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (productId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/products/${productId}`, config);
    return productId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Slice de productos
const productSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) => (product._id === action.payload._id ? action.payload : product));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default productSlice.reducer;