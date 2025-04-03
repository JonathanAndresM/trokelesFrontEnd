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

// Obtener todos los usuarios
export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Crear un nuevo usuario
export const createUser = createAsyncThunk("users/createUser", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/users`, userData, config);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Actualizar un usuario
export const updateUser = createAsyncThunk("users/updateUser", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_URL}/users/${userData.id}`, userData, config);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Eliminar un usuario
export const deleteUser = createAsyncThunk("users/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`, config);
    return userId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Slice de usuarios
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) => (user._id === action.payload._id ? action.payload : user));
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
