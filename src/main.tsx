import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import store from './store/store.ts';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserProvider } from './context/userContext.tsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById("root")!).render(
	<UserProvider>
		<HashRouter basename={import.meta.env.VITE_PUBLIC_URL}>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</UserProvider>
);
