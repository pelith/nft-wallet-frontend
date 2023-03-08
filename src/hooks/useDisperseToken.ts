import { useBoolean } from '@chakra-ui/react'
import { AddressZero, Zero } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { FetchBalanceResult, prepareWriteContract, writeContract } from 'wagmi/actions'

import ABINFTWalletFactory from '@/constants/abis/ABINFTWalletFactory'
import { USED_CHAIN } from '@/constants/chain'
import { NFT_FACTORY } from '@/constants/nftContract'
import { toast } from '@/utils/createToast'

interface IProps {
  tokenAddress: `0x${string}`
  NFTAddress: `0x${string}`
  targetInfos: { nftIndex: string; values: string }[]
  balanceData?: FetchBalanceResult
}
const createUseDisperseToken = (isSimple: boolean) => {
  return function useDisperse({
    tokenAddress,
    targetInfos,
    NFTAddress: nftAddress,
    balanceData,
  }: IProps) {
    const { isInsufficient, ids, values, sum } = useMemo(() => {
      const { sum, ids, values } = targetInfos.reduce(
        (prev, curr) => {
          const added = parseUnits(`${curr.values}`, balanceData?.decimals ?? 18)
          prev.sum = prev.sum.add(added)
          prev.values.push(added)
          prev.ids.push(BigNumber.from(curr.nftIndex))

          return prev
        },
        { sum: Zero, ids: [] as BigNumber[], values: [] as BigNumber[] },
      )
      const isInsufficient = sum.gt(balanceData?.value ?? Zero)

      return {
        isInsufficient,
        ids,
        values,
        sum,
      }
    }, [balanceData?.decimals, balanceData?.formatted, targetInfos])

    const [isLoading, { on, off }] = useBoolean(false)

    async function sendTransaction() {
      if (!isInsufficient) {
        on()
        try {
          const config = await prepareWriteContract({
            address: NFT_FACTORY[USED_CHAIN] || AddressZero,
            abi: ABINFTWalletFactory,
            functionName: isSimple ? 'disperseToken' : 'disperseTokenSimple',
            args: [tokenAddress, nftAddress, ids, values],
          })
          const { hash } = await writeContract(config)
          toast({
            title: `Transaction success: ${hash}`,
            status: 'success',
          })
        } catch (error) {
          console.error(error)
          toast({
            title: (error as Error).message,
            status: 'error',
          })
        }
        off()
      }
    }

    return {
      sendTransaction,
      isInsufficient,
      sum,
      isLoading,
    }
  }
}

export const useDisperseToken = createUseDisperseToken(false),
  useDisperseTokenSimple = createUseDisperseToken(true)
