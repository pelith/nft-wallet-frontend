import { Provider as MulticallProvider } from '@pelith/ethers-multicall'

import { ChainId } from '../constants/chain'
import { getJsonRpcProvider } from './getJsonRpcProvider'
const instance = new Map<ChainId, MulticallProvider>()

export function getMulticallProvider(chainId: ChainId): MulticallProvider {
  if (instance.has(chainId)) return instance.get(chainId)!
  const jsonRpcProvider = getJsonRpcProvider(chainId)
  instance.set(
    chainId,
    new MulticallProvider(
      jsonRpcProvider,
      chainId === ChainId.FORK_MAIN_NET ? 5 : chainId,
    ),
  )
  return instance.get(chainId)!
}
