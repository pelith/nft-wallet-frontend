import { ChainId } from '@/constants/chain'
import getRarityImage from '@/utils/getRarityImage'

export interface NFTCollection {
  name: string
  address: `0x${string}`
  imageLoader?: (data: string) => string
}

export const SAMPLE_NFT_ADDRESS: Record<ChainId, `0x${string}`> = {
  [ChainId.FORK_MAIN_NET]: '0x1dB5928284301FE16a703543Ac3e1fA6B15E8d93',
  [ChainId.FANTOM]: '0x1dB5928284301FE16a703543Ac3e1fA6B15E8d93',
}

export const NFT_COLLECTION: Record<ChainId, NFTCollection[]> = {
  [ChainId.FORK_MAIN_NET]: [
    {
      name: 'Rarity',
      address: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',
      imageLoader: getRarityImage,
    },
    {
      name: 'sample',
      address: SAMPLE_NFT_ADDRESS[ChainId.FORK_MAIN_NET] || '',
    },
  ],
  [ChainId.FANTOM]: [
    {
      name: 'Rarity',
      address: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',
      imageLoader: getRarityImage,
    },
    {
      name: 'sample',
      address: SAMPLE_NFT_ADDRESS[ChainId.FANTOM] || '',
    },
  ],
}

export const NFTCollectionInfo = {
  rarity: NFT_COLLECTION[ChainId.FANTOM][0],
  sample: NFT_COLLECTION[ChainId.FANTOM][1],
}
