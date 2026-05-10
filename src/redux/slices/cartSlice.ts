import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',

    initialState,

    reducers: {
        addToCart: (
            state,
            action: PayloadAction<Omit<CartItem, 'quantity'>>,
        ) => {
            const existingItem = state.cartItems.find(
                item => item.id === action.payload.id,
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (
            state,
            action: PayloadAction<number>,
        ) => {
            state.cartItems = state.cartItems.filter(
                item => item.id !== action.payload,
            );
        },

        increaseQuantity: (
            state,
            action: PayloadAction<number>,
        ) => {
            const item = state.cartItems.find(
                item => item.id === action.payload,
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (
            state,
            action: PayloadAction<number>,
        ) => {
            const item = state.cartItems.find(
                item => item.id === action.payload,
            );

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.cartItems =
                        state.cartItems.filter(
                            cartItem =>
                                cartItem.id !== action.payload,
                        );
                }
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;