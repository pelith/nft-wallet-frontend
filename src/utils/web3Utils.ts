import { getAddress } from '@ethersproject/address/lib'

import { ChainId } from '../constants/chain'
import CHAIN_INFOS from '../constants/chainDetails'
import { IChainData } from '../types/web3Types'

export function getChainData(chainId: ChainId): IChainData {
  const chainData = CHAIN_INFOS[chainId]

  if (!chainData) {
    throw new Error('ChainId missing or not supported')
  }

  const API_KEY = import.meta.env.REACT_APP_INFURA_ID

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}

export const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  [ChainId.FANTOM]: '',
  [ChainId.FORK_MAIN_NET]: '',
  [ChainId.GOERLI]: 'goerli.',
}

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address',
): string {
  const prefix =
    chainId === ChainId.FANTOM
      ? 'https://ftmscan.com'
      : `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export function shortenTxId(address: string, chars = 6): string {
  return `${address.substring(0, chars + 2)}...${address.substring(64 - chars)}`
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, padStart = 4, padEnd = padStart): string {
  const parsed = isAddress(address)
  if (!parsed) throw Error(`Invalid 'address' parameter '${address}'.`)
  return `${parsed.substring(0, padStart + 2)}...${parsed.substring(42 - padEnd)}`
}

export function isAddress(value: any) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
