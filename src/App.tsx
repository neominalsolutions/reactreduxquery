import React from 'react';
import logo from './logo.svg';
import './App.css';
import CounterOperationPage from './pages/CounterOperationPage';
import { Link, Outlet } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Link to="/CounterSummary">Counter Summary</Link> {' '}
			<Link to="/CounterOperation">Counter Operation</Link> {' '}
			<Link to="/Products">Ürünler 1</Link> {' '}
			<Link to="/ProductsQuery">Ürünler 2</Link>
			{/* <CounterOperationPage /> */}
			<Outlet />
		</div>
	);
}

export default App;
