import { useRoutes } from 'react-router-dom'

import { routes } from './constants/router'
import { wagmiClient } from './wagmiConfigure'
wagmiClient.connector?.getSigner({ chainId: 5 })
function App() {
  const routesEle = useRoutes(routes)
  return <>{routesEle}</>
}

export default App
