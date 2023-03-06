import { ChainId } from '@/constants/chain'
export interface TokenInfo {
  name: string
  symbol: string
  decimals: number
  address: `0x${string}`
}
export const tokenList: (TokenInfo & { chainId: number })[] = [
  {
    name: 'TestToken1',
    symbol: 'TUSDT',
    address: '0x4da7745993E76929Ba11fDa60cAF671e8161F0fa',
    decimals: 18,
    chainId: ChainId.FORK_MAIN_NET,
  },
]
