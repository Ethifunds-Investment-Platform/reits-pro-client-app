import { User } from "@/types/user.types";
import { changeAccount, changeToken, updateAccount } from "./account.slice";
import { useAppDispatch } from "./hooks";
import {
	BackBtnPayload,
	changeBackBtn,
	changeDialog,
	changePageTitle,
	DialogPayload,
	resetDialog,
} from "./ui.slice";
import { setCurrencies, setActiveCurrency } from "./init.slice";
import { Currency } from "@/types/currency.types";
// import {
// 	addNotification,
// 	ChangeNotificationDialog,
// 	changeNotificationDialog,
// 	MarkIsRead,
	// 	markIsRead,
// 	resetNotificationDialog,
// } from "./notification-slice";

export default function useActions() {
	const dispatch = useAppDispatch();
	const ui = {
		changeDialog: (payload: Partial<DialogPayload>) => dispatch(changeDialog(payload)),
		resetDialog: () => dispatch(resetDialog()),
		changePageTitle: (payload: string) => dispatch(changePageTitle(payload)),
		changeBackBtn: (payload: BackBtnPayload | null) => dispatch(changeBackBtn(payload)),
	};

	const account = {
		changeAccount: (payload: User) => dispatch(changeAccount(payload)),
		changeToken: (payload: string) => dispatch(changeToken(payload)),
		updateAccount: (payload: Partial<User>) => dispatch(updateAccount(payload)),
	};

	const init = {
		setCurrencies: (payload: Currency[]) => dispatch(setCurrencies(payload)),
		setActiveCurrency: (payload: Currency) => dispatch(setActiveCurrency(payload)),
	};

	// const notification = {
	// 	addNotification: (payload: Notification[]) => dispatch(addNotification(payload)),
	// 	markIsRead: (payload: MarkIsRead) => dispatch(markIsRead(payload)),
	// 	changeNotificationDialog: (payload: ChangeNotificationDialog) =>
	// 		dispatch(changeNotificationDialog(payload)),
	// 	resetNotificationDialog: () => dispatch(resetNotificationDialog()),
	// };
	return {
		ui,
		account,
		init,
		// notification,
	};
}
