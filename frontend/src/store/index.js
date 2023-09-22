import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PERSIST_STORE_NAME } from '../constants/app.constant';
import rootReducer from './rootReducer';

const middlewares = [];

const persistConfig = {
	key: PERSIST_STORE_NAME,
	keyPrefix: '',
	storage,
	whitelist: [
		'auth',
		'payments',
		'withdraw',
		'chat',
		'requests',
		'notifications',
	],
	// debug: true,
	// serialize: false,
	// deserialize: false,
};

const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer()),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development',
});

store.asyncReducers = {};

export const persistor = persistStore(store);

export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(
		persistReducer(persistConfig, rootReducer(store.asyncReducers))
	);
	persistor.persist();
	return store;
};

export * from './hooks';
export default store;
