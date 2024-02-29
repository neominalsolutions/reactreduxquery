import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CartItem = {
	id: number;
	quantity: number;
	name: string;
	price: number;
};

export type CartState = {
	items: CartItem[];
	total: number;
};

const init: CartState = { items: [], total: 0 };

const CartSlice = createSlice({
	name: 'CART',
	initialState: init,
	reducers: {
		InitCartFromStorage(state: CartState) {
			const cartStorage = localStorage.getItem('cart');

			if (cartStorage) {
				console.log('cart-data', JSON.parse(cartStorage));
                // jsonstring olarak atılan veriyi JSON.parse ile serialize ediyorum.
				const _cart = JSON.parse(cartStorage) as CartState;
				state.items = _cart.items;
				state.total = _cart.total;
			}
		},
		addToCart(state: CartState, action: PayloadAction<CartItem>) {
			state.items = [...state.items, action.payload];
			state.total = 0;

			state.items.forEach((item: CartItem) => {
				state.total += item.price * item.quantity;
			});

			localStorage.removeItem('cart');
			localStorage.setItem('cart', JSON.stringify(state));
			// persist ettik.
		},
	},
});

export const { addToCart, InitCartFromStorage } = CartSlice.actions;
const CartReducer = CartSlice.reducer;
export default CartReducer;
