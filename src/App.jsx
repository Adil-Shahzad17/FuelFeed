import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import FuelStore from './lib/store/fuelStore'
import Routing from './Routing'

const App = () => {

  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={FuelStore}>
          <Routing />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App