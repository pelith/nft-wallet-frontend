import { JsonRpcProvider } from '@ethersproject/providers'

import { ChainId, JSON_RPC_NETWORK } from '../constants/chain'
const instance = new Map<ChainId, JsonRpcProvider>()

export function getJsonRpcProvider(chainId: ChainId): JsonRpcProvider {
  if (instance.has(chainId)) return instance.get(chainId)!
  instance.set(chainId, new JsonRpcProvider(JSON_RPC_NETWORK[chainId]))
  return instance.get(chainId)!
}
