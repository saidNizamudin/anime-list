/** @jsxImportSource @emotion/react */
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from './apolloClient.tsx';
import { Anime, CollectionDetail, CollectionList, Home, Navbar } from './pages';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/:id" element={<Anime />} />
						<Route path="/collections" element={<CollectionList />} />
						<Route path="/collection/:id" element={<CollectionDetail />} />
						<Route path="*" element={<Home />} />
					</Routes>
					<ToastContainer />
				</BrowserRouter>
			</ApolloProvider>
		</Provider>
	</React.StrictMode>
);
