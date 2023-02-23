import { ChainId } from '@/constants/chain'
export const NFT_FACTORY: Record<ChainId, `0x${string}`> = {
  [ChainId.FORK_MAIN_NET]: import.meta.env.VITE_APP_LOCAL_NFT_FACTORY,
}
