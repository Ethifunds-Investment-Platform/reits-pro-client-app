
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientConfig } from "./config/query-client-config.ts";
import ErrorBoundary from "./components/app/error-boundary/index.tsx";
import { Provider } from "react-redux";
import store from "./store";

const client = new QueryClient(queryClientConfig);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={client}>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
