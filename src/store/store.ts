import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './features/CounterSlice';
import { ProductRecuder } from './features/ProductSlice';
import CartReducer from './features/CartSlice';

// reducer kısmına geliştiriğimiz sliceları tanımlayacağız
// uygulamada tek store birden fazla slice tanımı olabilir
export const store = configureStore({
	reducer: {
		counterState: CounterReducer,
		productState: ProductRecuder,
		cartState: CartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
// ne kadar reducer varsa , ile ayrılarak
// storedan counterState çağıracağımız zaman counterState olarak çağırıyoruz.

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
