import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const storeUser = localStorage.getItem("user");
const storeToken = localStorage.getItem("token");

// Estado inicial
const initialState = {
    user: storeUser ? JSON.parse(storeUser) : null,
    token: storeToken || null,
    loading: false,
    error: null,
};

// Accion para iniciar sesión
export const loginUser = createAsyncThunk("auth/loginUser", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(API_URL+"/login", data);
        const { user, token } = res.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        console.log(res);
        
        return { user, token };
    } catch (error) {
        console.error("Error en login:", error.response ? error.response.data : error);
        return rejectWithValue(error.response?.data?.message || "Error desconocido");
    }
});

// Accion para el registro
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        await axios.post("http://localhost:8080/api/auth/register", userData);
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Accion para cerrar sesión
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
});

// Slice de autenticación
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Registro
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;