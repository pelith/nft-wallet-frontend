import { Navigate, RouteObject } from 'react-router-dom'

import NftDemoMint from '@/components/nftPicker/NftDemoMint'
import NftNavigator from '@/components/nftPicker/NftNavigator'
import NftPicker from '@/components/nftPicker/NftPicker'
import NftPickerMainLayout from '@/components/nftPicker/NftPickerMainLayout'
import NftWalletDetails from '@/components/nftWalletDetails/NftWalletDetails'
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
      {
        path: '/nft/:nftAddress/:nftIndex',
        element: <NftWalletDetails />,
      },
      {
        path: '/nft-picker',
        element: <NftPickerMainLayout />,
        children: [
          {
            index: true,
            element: <NftPicker />,
          },
          {
            path: '/nft-picker/input',
            element: <NftNavigator />,
          },
          {
            path: '/nft-picker/mint',
            element: <NftDemoMint />,
          },
        ],
      },
    ],
  },

  { path: '*', element: <Navigate replace to="/" /> },
]
