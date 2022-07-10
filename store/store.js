import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['post'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
store.sagaTask = sagaMiddleware.run(rootSaga);
