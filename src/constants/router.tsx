import { Navigate, RouteObject } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import NFTWalletConnect from '@/pages/NFTWalletConnect'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <NFTWalletConnect />,
      },
      {
        path: '/disperse',
        element: <div>disperse</div>,
      },
      {
        path: '/explorer',
        element: <div>explorer</div>,
      },
    ],
  },

  { path: '*', element: <Navigate replace to="/" /> },
]
