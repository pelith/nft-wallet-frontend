import ethNetworkIconSrc from '@/assets/icon-network-ethereum.svg'

import { IChainData } from '../types/web3Types'
import { ChainId } from './chain'

const CHAIN_INFOS: { [chainId in ChainId]?: IChainData } = {
  [ChainId.MAINNET]: {
    name: 'Ethereum Mainnet',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    network_icon_src: ethNetworkIconSrc,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  [ChainId.POLYGON]: {
    name: 'Polygon',
    network: 'polygon',
    chain_id: 137,
    network_id: 137,
    rpc_url: 'https://polygon-rpc.com',
    native_currency: {
      symbol: 'MATIC',
      name: 'MATIC',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  [ChainId.FANTOM]: {
    name: 'Fantom',
    network: 'fantom',
    chain_id: 250,
    network_id: 250,
    rpc_url: 'https://rpc.ankr.com/fantom',
    native_currency: {
      symbol: 'FTM',
      name: 'FTM',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  [ChainId.FORK_MAIN_NET]: {
    name: 'Ethereum Mainnet Dev chain',
    network: 'mainnet_fork',
    network_icon_src: ethNetworkIconSrc,
    chain_id: 8787,
    network_id: 8787,
    rpc_url: '',
    native_currency: {
      symbol: 'ETH',
      name: 'ETH',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  [ChainId.GOERLI]: {
    name: 'Goerli',
    network: 'goerli',
    network_icon_src: ethNetworkIconSrc,
    chain_id: 5,
    network_id: 5,
    rpc_url: '',
    native_currency: {
      symbol: 'GoerliETH',
      name: 'GoerliETH',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
}

export default CHAIN_INFOS
