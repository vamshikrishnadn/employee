import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import AuthReducers from './AuthReducers';
import AppReducers from './AppReducers';
import DepartmentReducers from './DepartmentReducers';
import QueryReducers from './QueryReducers';

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  auth: AuthReducers,
  app: AppReducers,
  department: DepartmentReducers,
  query: QueryReducers,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, composeEnhancers(middleware));

export const persistor = persistStore(store);
