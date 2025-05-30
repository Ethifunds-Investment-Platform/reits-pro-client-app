import getActiveCurrency from "@/services/get-active-currency";
import getCurrencies from "@/services/get-currencies";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner";

/**
 * This hook is used to initialize the app
 * It fetches all global data and sets them in a global state like store e.g(currencies, countries, etc)
 */
export default function useInit() {
	const { currencies, activeCurrency } = useAppSelector("init");
	const { init } = useActions();

	const getCurrencyList = React.useCallback(async () => {
		if (currencies.length) return;
		try {
			const response = await getCurrencies();

			if (response) {
				init.setCurrencies(response);
				
			}
		} catch (error) {
			toast.error("Error getting currencies");
			throw error;
		}
	}, [currencies.length, ]);

	const getAppActiveCurrency = React.useCallback(async () => {
		if (activeCurrency.id) return;
		try {
			const response = await getActiveCurrency();
			init.setActiveCurrency(response);
		} catch (error) {
			toast.error("Error getting active currency");
			throw error;
		}
	}, [activeCurrency]);


	React.useLayoutEffect(() => {
		getCurrencyList();
		getAppActiveCurrency();
	}, [getCurrencyList, getAppActiveCurrency]);
}
