import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers/index';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  };
  
export const store = createStore(persistReducer(persistConfig, rootReducer));

export const persistor = persistStore(store);  