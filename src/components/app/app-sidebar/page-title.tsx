import * as React from "react";
import AppContainer from "../container/container";
import { useAppSelector } from "@/store/hooks";

export default React.memo(function PageTitle() {
	const { pageTitle } = useAppSelector((state) => state.ui);
	if (!pageTitle) return;
	return (
		<AppContainer className="!pb-0">
			<h1 className="heading-4 capitalize">{pageTitle}</h1>
		</AppContainer>
	);
});
