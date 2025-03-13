import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../assets/interceptor";

const API_URL = "http://localhost:8080/api/admin";
const user = JSON.parse(localStorage.getItem("user"));
const config = {
  headers: {
    Authorization: `Bearer ${user?.token}` // Aquí extraes solo el token
  }
};

// Obtener todos los usuarios
export const getUsers = createAsyncThunk("admin/getUsers", async (_, {rejectWithValue}) => {
    try {
        const res = await api.get(`${API_URL}/users`, config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Crear un nuevo usuario
export const createUser = createAsyncThunk("admin/createUser", async (userData, {rejectWithValue}) => {
    try {
        const res = await api.post(`${API_URL}/users`, userData, config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Actualizar un usuario
export const updateUser = createAsyncThunk("admin/updateUser", async (userData, {rejectWithValue}) => {
    try {
        const res = await api.put(`${API_URL}/users/${userData.id}`, userData, config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Eliminar un usuario
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, {rejectWithValue}) => {
    try {
        await api.delete(`${API_URL}/users/${userId}`, config);
        return userId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Obtener todos los productos
export const getProducts = createAsyncThunk("admin/getProducts", async (_, {rejectWithValue}) => {
    try {
        const res = await api.get(`${API_URL}/products`, config);
        
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Crear un nuevo producto
export const createProduct = createAsyncThunk("admin/createProduct", async (productData, {rejectWithValue}) => {
    try {
        const res = await api.post(`${API_URL}/products`, productData, config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Actualizar un producto
export const updateProduct = createAsyncThunk("admin/updateProduct", async (productData, {rejectWithValue}) => {
    try {
        const res = await api.put(`${API_URL}/products/${productData.id}`, productData, config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Eliminar un producto
export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (productId, {rejectWithValue}) => {
    try {
        await api.delete(`${API_URL}/products/${productId}`, config);
        return productId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Slice de administración
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Obtener usuarios
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Crear usuario
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Actualizar usuario
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.users = state.users.map((user) => user._id === action.payload._id ? action.payload : user);
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Eliminar usuario
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user._id !== action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Obtener productos
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Crear producto
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Actualizar producto
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products.map((product) => product._id === action.payload._id ? action.payload : product);
                state.loading = false;
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Eliminar producto
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;