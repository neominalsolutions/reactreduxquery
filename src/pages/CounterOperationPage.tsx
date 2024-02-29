import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { decrease, increase, reset } from '../store/features/CounterSlice';
import CounterSummaryPage from './CounterSummaryPage';

function CounterOperationPage() {
	//state set edilmesi için burayı kullanacağız
	const dispatch = useDispatch<AppDispatch>();
	// action tetiklemek için useDispatch hook kullanırız.
	return (
		<div>
			<CounterSummaryPage />
			<hr></hr>
			<button
				onClick={() => {
					dispatch(increase());
				}}
			>
				(+)
			</button>
			<button
				onClick={() => {
					dispatch(decrease());
				}}
			>
				(-)
			</button>
			<button
				onClick={() => {
					dispatch(reset());
				}}
			>
				(0)
			</button>
		</div>
	);
}

export default CounterOperationPage;
