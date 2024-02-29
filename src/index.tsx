import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CounterSummaryPage from './pages/CounterSummaryPage';
import CounterOperationPage from './pages/CounterOperationPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		{/* Context API deki gibi bütün uygulamayı provider componenti ile sarmalladık. */}

		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' Component={App}>
						<Route path='/CounterSummary' Component={CounterSummaryPage}></Route>
						<Route path='/CounterOperation' Component={CounterOperationPage}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
