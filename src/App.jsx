import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { FuelStore, persistor } from './lib/store/fuelStore'
import { PersistGate } from "redux-persist/integration/react";
import Routing from './Routing'

const App = () => {

  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={FuelStore}>
          <PersistGate loading={null} persistor={persistor}>
            <Routing />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App