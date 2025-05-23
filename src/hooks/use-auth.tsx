import * as React from "react";
import useCookie from "./use-cookie";
import { variables } from "@/constants";
import axios from "@/lib/axios";
import useActions from "@/store/actions";
import { users } from "@/constants/data/users";
import useAppSelector from "@/store/hooks";

export default function useAuth() {
	const { account } = useAppSelector("account");
	const { cookie: authToken,  } = useCookie(variables.STORAGE.session, "");
	const { account: accountActions } = useActions();

	const getUser = React.useCallback(async () => {
		if (!authToken || !account?.id) return null;
		if (variables.NODE_ENV === "development") {
			accountActions.changeAccount(users[0]);
			return;
		}
		const response = await axios.get("/me");
		if (response.data.data) {
			return accountActions.changeAccount(response.data.data);
		}
	}, [authToken, account?.id]);

	React.useLayoutEffect(() => {
		getUser();
	}, [getUser]);
}
