import range from 'lodash/range'
import { erc721ABI } from 'wagmi'
import { readContract } from 'wagmi/actions'

import { nftWalletsStore } from '@/store/nftWallet'

export default async function getERC721EnumerableScan(
  address: `0x${string}`,
  nftAddress: `0x${string}`,
) {
  try {
    const result = await readContract({
      address: nftAddress,
      abi: erc721ABI,
      functionName: 'balanceOf',
      args: [address],
    })
    const rangeOfIndex = range(1, result.toNumber() - 1)
    for await (const result of rangeOfIndex.map((i) =>
      nftWalletsStore.set.addNFTAddress(nftAddress, i),
    )) {
      console.log(result)
    }
  } catch (error) {
    console.error(error)
  }
}
