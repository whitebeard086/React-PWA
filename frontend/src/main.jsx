import '@smastrom/react-rating/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import store from './store';
// import App from './taskitly';
import App from './App';

import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			{/* <PersistGate loading={null} persistor={persistor}> */}
			<App />
			{/* </PersistGate> */}
		</Provider>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
