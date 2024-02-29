import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CounterOperationPage from './pages/CounterOperationPage';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { CartState, InitCartFromStorage } from './store/features/CartSlice';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	const cartState = useSelector(
		(state: RootState) => state.cartState
	) as CartState;

	useEffect(() => {
		dispatch(InitCartFromStorage());
		console.log('app-init');
	}, []);

	return (
		<div className="App">
			<div>Sepet Toplam: {cartState.total}</div>
			<div>Ürün Adeti: {cartState.items.length}</div>
			<hr></hr>
			<Link to="/CounterSummary">Counter Summary</Link>{' '}
			<Link to="/CounterOperation">Counter Operation</Link>{' '}
			<Link to="/Products">Ürünler 1</Link>{' '}
			<Link to="/ProductsQuery">Ürünler 2</Link>{' '}
			<Link to="/CartSummary">Sepet Detay</Link>{' '}
			{/* <CounterOperationPage /> */}
			<Outlet />
		</div>
	);
}

export default App;
