import { useRoutes } from 'react-router-dom'

import { routes } from './constants/router'
import { ToastContainer } from './utils/createToast'
import { wagmiClient } from './wagmiConfigure'
wagmiClient.connector?.getSigner({ chainId: 5 })
function App() {
  const routesEle = useRoutes(routes)
  return (
    <>
      {routesEle}
      <ToastContainer />
    </>
  )
}

export default App
