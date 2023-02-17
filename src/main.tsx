import './index.css'

import ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import App from './App'
import { wagmiClient } from './wagmiConfigure'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <App />
  </WagmiConfig>,
)
