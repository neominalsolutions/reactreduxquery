import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Product = {
	ProductName: string;
	ProductID: number;
	UnitPrice: number;
};

export type ProductState = {
	products: Product[];
	fetched: boolean;
	error: any;
	isLoading: boolean;
};

export const fetchProducts = createAsyncThunk('FETCHProducts', async () => {
	return await axios.get(
		'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
	);

	// return Promise.reject('Hata');
});

const init: ProductState = {
	products: [],
	isLoading: false,
	fetched: false,
	error: null,
};

const ProductSlice = createSlice({
	name: 'Product',
	initialState: init,
	reducers: {
		// senkron state durumları için var
	},
	extraReducers(builder) {
		// asenkron state durumu için burayı kullanıyoruz.
		builder.addCase(fetchProducts.pending, (state: ProductState) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProducts.rejected, (state: ProductState) => {
			state.isLoading = false;
			state.error = { message: 'Ürünler çekilirken hata meydana geldi' };
		});
		builder.addCase(
			fetchProducts.fulfilled,
			(state: ProductState, action: any) => {
				state.products = action.payload.data.value;
				state.isLoading = false;
				state.fetched = true;
				state.error = null;
			}
		);
	},
});

export const ProductRecuder = ProductSlice.reducer;
