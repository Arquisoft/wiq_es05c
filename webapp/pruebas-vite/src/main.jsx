import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'


import { App } from './App.jsx'
import './App.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
