import { Currency } from "@/types/currency.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitState = {
	currencies: Currency[];
	activeCurrency: Currency;
};

const initialState: InitState = {
	currencies: [],
	activeCurrency: {} as Currency,
};

/**
 * This slice is used to initialize the app
 * It fetches all global data and sets them in a global state like store e.g(currencies, countries, etc)
 */
const initSlice = createSlice({
	name: "init",
	initialState,
	reducers: {
		setCurrencies: (state, action: PayloadAction<Currency[]>) => {
			return {
				...state,
				currencies: action.payload,
			};
		},
		setActiveCurrency: (state, action: PayloadAction<Currency>) => {
			return {
				...state,
				activeCurrency: action.payload,
			};
		},
	},
});

export const { setCurrencies, setActiveCurrency } = initSlice.actions;
export default initSlice.reducer;
