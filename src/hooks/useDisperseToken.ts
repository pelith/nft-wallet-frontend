import { AddressZero, Zero } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useBalance, usePrepareContractWrite } from 'wagmi'
import { prepareWriteContract, writeContract } from 'wagmi/actions'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'
import ABINFTWalletFactory from '@/constants/abis/ABINFTWalletFactory'
import { NFT_FACTORY } from '@/constants/nftContract'
import { useNFTWalletStore } from '@/store'

interface IProps {
  tokenAddress: `0x${string}`
  nftAddress: `0x${string}`
  targetInfos: { nftIndex: string; values: string }[]
  nftWalletAddress?: `0x${string}`
}
const createUseDisperseToken = (isSimple: boolean) => {
  return function useDisperse({
    tokenAddress,
    targetInfos,
    nftAddress,
    nftWalletAddress,
  }: IProps) {
    const isDisperseFromNFTWallet = !!nftWalletAddress
    const { data: balanceData } = useBalance({
      address: nftWalletAddress,
      watch: true,
      token: tokenAddress,
    })

    const { isInsufficient, ids, values } = useMemo(() => {
      const { sum, ids, values } = targetInfos.reduce(
        (prev, curr) => {
          const added = parseUnits(curr.values, curr.values)
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
      }
    }, [...targetInfos, balanceData?.decimals, balanceData?.formatted])
    const chainId = useNFTWalletStore((state) => state.chainId)
    const { config: disperseConfig } = usePrepareContractWrite({
      address: NFT_FACTORY[chainId] || AddressZero,
      abi: ABINFTWalletFactory,
      functionName: isSimple ? 'disperseToken' : 'disperseTokenSimple',
      args: [tokenAddress, nftAddress, ids, values],
    })

    async function sendTransaction() {
      if (isInsufficient) return
      if (isDisperseFromNFTWallet) {
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
    }
  }
}

export default {
  useDisperseToken: createUseDisperseToken(false),
  useDisperseTokenSimple: createUseDisperseToken(true),
}
