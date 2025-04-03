import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './adminSlice';
import usersReducer from './userSlice';
import productsReducer from './productSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        users: usersReducer,
        products: productsReducer,
    },
});