import { RouteObject } from 'react-router-dom'

import NFTWalletConnect from '@/pages/NFTWalletConnect'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <NFTWalletConnect />,
  },
  { path: '*', element: <NFTWalletConnect /> },
]
