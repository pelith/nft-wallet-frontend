import { BigNumber } from 'ethers'
import range from 'lodash/range'
import { erc721ABI } from 'wagmi'
import { multicall, readContract } from 'wagmi/actions'

import ABINFTSample from '@/constants/abis/ABINFTSample'
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
    const rangeOfIndex = range(0, result.toNumber()).map((i) => BigNumber.from(i))

    const _ownedIds = await multicall({
      contracts: rangeOfIndex.map((id) => ({
        address: nftAddress,
        abi: ABINFTSample,
        functionName: 'tokenOfOwnerByIndex',
        args: [address, id],
      })),
    })

    for await (const result of (_ownedIds as BigNumber[]).map((i) =>
      nftWalletsStore.set.addNFTAddress(nftAddress, i.toNumber()),
    )) {
      console.log(result)
    }
  } catch (error) {
    console.error(error)
  }
}
