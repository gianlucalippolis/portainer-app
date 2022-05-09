/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { SplashScreen } from './src/SplashScreen'; 
import Navigator from './Navigator';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <PersistGate 
        loading={<SplashScreen />}
        persistor={persistor}
      >
        <Navigator />
      </PersistGate>
      <FlashMessage position="top" />
      <StatusBar backgroundColor="#282e33" barStyle={'dark-content'} />
    </Provider>
   
  );
};

export default App; 
