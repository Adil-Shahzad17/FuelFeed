import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, } from '@tanstack/react-query'
import { queryClient } from "@/lib/tanstack/queryClient"
import { Provider } from 'react-redux'
import { FuelStore, persistor } from './lib/store/fuelStore'
import { PersistGate } from "redux-persist/integration/react";
import Routing from './Routing'
import ErrorBoundary from './constants/ErrorBoundry/ErrorBoundry'

const App = () => {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={FuelStore}>
          <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
              <Routing />
            </ErrorBoundary>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App