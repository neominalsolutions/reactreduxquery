import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CounterState } from '../store/features/CounterSlice';

function CounterSummaryPage() {
	const counterState = useSelector<RootState>(
		(state) => state.counterState
	) as CounterState;

    // store üzerinden değişen state yakalamak için useSelector Hook kullandık.

	return <div>Değer : {counterState.count}</div>;
}

export default CounterSummaryPage;
