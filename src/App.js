import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './redux';
import Routers from './routers';

const queryClient = new QueryClient

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <Routers />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  )
}

export default App