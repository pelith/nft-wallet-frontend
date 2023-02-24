import { useBoolean } from '@chakra-ui/react'
import { AddressZero, Zero } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useAccount, useBalance, usePrepareContractWrite } from 'wagmi'
import { prepareWriteContract, writeContract } from 'wagmi/actions'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'
import ABINFTWalletFactory from '@/constants/abis/ABINFTWalletFactory'
import { NFT_FACTORY } from '@/constants/nftContract'
import { useNFTWalletStore } from '@/store'

interface IProps {
  tokenAddress: `0x${string}`
  NFTAddress: `0x${string}`
  targetInfos: { nftIndex: string; values: string }[]
  NFTWalletAddress?: `0x${string}`
}
const createUseDisperseToken = (isSimple: boolean) => {
  return function useDisperse({
    tokenAddress,
    targetInfos,
    NFTAddress: nftAddress,
    NFTWalletAddress: nftWalletAddress,
  }: IProps) {
    const { address } = useAccount()
    const isDisperseFromNFTWallet = !!nftWalletAddress

    const usedAccount = nftWalletAddress ?? address
    const { data: balanceData } = useBalance({
      address: usedAccount,
      watch: true,
      token: tokenAddress,
    })

    const { isInsufficient, ids, values, sum } = useMemo(() => {
      const { sum, ids, values } = targetInfos.reduce(
        (prev, curr) => {
          const added = parseUnits(curr.values, balanceData?.decimals ?? 18)
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
    }, [...targetInfos, balanceData?.decimals, balanceData?.formatted])
    const chainId = useNFTWalletStore((state) => state.chainId)
    const { config: disperseConfig } = usePrepareContractWrite({
      address: NFT_FACTORY[chainId] || AddressZero,
      abi: ABINFTWalletFactory,
      functionName: isSimple ? 'disperseToken' : 'disperseTokenSimple',
      args: [tokenAddress, nftAddress, ids, values],
    })

    const [isLoading, { on, off }] = useBoolean(false)

    async function sendTransaction() {
      if (isInsufficient) return
      if (isDisperseFromNFTWallet) {
        on()
        const walletConfig = await prepareWriteContract({
          address: nftWalletAddress,
          abi: ABINFTWallet,
          functionName: 'execute',
          args: [
            NFT_FACTORY[chainId] || AddressZero,
            Zero,
            (disperseConfig?.request?.data || `0x`) as `0x${string}`,
          ],
        })

        const result = await writeContract(walletConfig)
        await result.wait()
        off()
        return result.hash
      } else {
        const result = await writeContract(disperseConfig)
        await result.wait()
        return result.hash
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
