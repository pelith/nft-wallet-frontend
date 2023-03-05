import { ChainId } from '@/constants/chain'
import getRarityImage from '@/utils/getRarityImage'

export interface NFTCollection {
  name: string
  address: `0x${string}`
  notEnumerable?: boolean
  imageLoader?: (data: string) => string
}

export const SAMPLE_NFT_ADDRESS: Record<ChainId, `0x${string}`> = {
  [ChainId.FORK_MAIN_NET]: import.meta.env.VITE_APP_SAMPLE_NFT_ADDRESS,
  [ChainId.FANTOM]: import.meta.env.VITE_APP_SAMPLE_NFT_ADDRESS,
}

export const NFT_COLLECTION: Record<ChainId, NFTCollection[]> = {
  [ChainId.FORK_MAIN_NET]: [
    {
      name: 'Rarity',
      address: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',
      imageLoader: getRarityImage,
      notEnumerable: true,
    },
    {
      name: 'Sample',
      address: SAMPLE_NFT_ADDRESS[ChainId.FORK_MAIN_NET] || '',
    },
  ],
  [ChainId.FANTOM]: [
    {
      name: 'Rarity',
      address: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',
      imageLoader: getRarityImage,
      notEnumerable: true,
    },
    {
      name: 'Sample',
      address: SAMPLE_NFT_ADDRESS[ChainId.FANTOM] || '',
    },
  ],
}

export const NFTCollectionInfo = {
  rarity: NFT_COLLECTION[ChainId.FANTOM][0],
  sample: NFT_COLLECTION[ChainId.FANTOM][1],
}
