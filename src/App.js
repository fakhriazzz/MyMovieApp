import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routers from './routers';
import { Provider } from 'react-redux';
import { store } from './redux';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </Provider>
  )
}

export default App