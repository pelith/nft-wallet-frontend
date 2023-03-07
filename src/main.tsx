import './App.css'

import { enableMapSet } from 'immer'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'

import App from './App'
import ThemeProvider from './themes'
import { wagmiClient } from './wagmiConfigure'

enableMapSet()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </WagmiConfig>,
)

console.log(import.meta.env.VITE_APP_CHAIN)
