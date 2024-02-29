import { createSlice } from '@reduxjs/toolkit';

export type CounterState = {
	count: number;
};

const counterInitialState: CounterState = {
	count: 0,
};

// reset (0),increase (+),decrease (-)
// COUNTER_RESET, COUNTER_INCREASE, COUNTER_DECREASE
const CounterSlice = createSlice({
	name: 'COUNTER', // name state prefix
	initialState: counterInitialState,
	reducers: {
		reset: (state: CounterState) => {
			state.count = 0;
			// return {...state}; gerek yok
		},
		increase: (state: CounterState) => {
			state.count = state.count + 1;
		},
		decrease: (state: CounterState) => {
			state.count = state.count - 1;
		},
	},
});
export const { reset, increase, decrease } = CounterSlice.actions;
const CounterReducer = CounterSlice.reducer;
export default CounterReducer;
