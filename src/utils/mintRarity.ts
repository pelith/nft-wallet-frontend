import { BigNumber } from 'ethers'
import { prepareWriteContract, watchContractEvent, writeContract } from 'wagmi/actions'

import ABINFTRarity from '@/constants/abis/ABINFTRarity'
import { NFTCollectionInfo } from '@/constants/nftColllection'

import { useTransactionHistoryStore } from './../store/transactionHistory'

export default async function mintRarity(walletAddress: `0x${string}`, classId?: number) {
  const config = await prepareWriteContract({
    abi: ABINFTRarity,
    address: NFTCollectionInfo.rarity.address,
    functionName: 'summon',
    args: [BigNumber.from(classId ?? ~~(Math.random() * 11 + 1))],
  })
  const result = writeContract(config)

  const _response = result.then(
    (res) => (useTransactionHistoryStore.getState().addHistory(res.hash), res),
  )

  const { summonedIndex } = await new Promise<{
    classIndex: number
    summonedIndex: number
  }>((res) => {
    const unwatch = watchContractEvent(
      {
        abi: ABINFTRarity,
        address: NFTCollectionInfo.rarity.address,
        eventName: 'summoned',
      },
      (sender, classIndex, summonedIndex) => {
        if (sender === walletAddress) {
          res({
            classIndex: classIndex.toNumber(),
            summonedIndex: summonedIndex.toNumber(),
          })
          unwatch()
        }
      },
    )
  })

  return { summonedIndex, result: await _response }
}
