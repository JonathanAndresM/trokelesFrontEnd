import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity, userType } = action.payload;

            const minQuantity = userType === "mayorista" ? product.minWholesaleQuantity : 1;

            if (quantity < minQuantity) {
                alert(`La cantidad mínima para mayoristas es ${minQuantity}`);
                return;
            }

            state.cart.push({ ...product, quantity });
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;