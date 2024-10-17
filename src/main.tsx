import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { UserProvider } from "./context/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<UserProvider>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</UserProvider>
);
