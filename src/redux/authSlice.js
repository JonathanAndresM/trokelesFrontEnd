import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Estado inicial
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

// Accion para iniciar sesión
export const loginUser = createAsyncThunk("auth/loginUser", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post("http://localhost:8080/api/auth/login", data);
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error en login:", error.response ? error.response.data : error);
        return rejectWithValue(error.response?.data?.message || "Error desconocido");
    }
});
/*export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', userData);
    const { user, token } = response.data;
    
    // Verifica que los datos recibidos sean correctos
    if (user && token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }
    
    return { user, token };  // Regresa tanto el usuario como el token
});*/

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
                state.user = action.payload;
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
            });
    },
});

export default authSlice.reducer;