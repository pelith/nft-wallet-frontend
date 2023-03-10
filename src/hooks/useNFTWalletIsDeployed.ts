import { useBoolean } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { useEffect } from 'react'
import { useBlockNumber, useProvider } from 'wagmi'

import { isAddress } from '@/utils/web3Utils'

export default function useNFTWalletIsDeployed({
  walletAddress,
}: {
  walletAddress: string
}) {
  const usedWalletAddress = isAddress(walletAddress) || AddressZero
  const provider = useProvider()
  const [isLoading, setIsLoading] = useBoolean()
  const [isDeployed, setIsDeployed] = useBoolean()
  function refetch() {
    if (usedWalletAddress !== AddressZero) {
      setIsLoading.on()
      provider
        .getCode(usedWalletAddress)
        .then((res) => {
          if (res === '0x') {
            setIsDeployed.off()
          } else {
            setIsDeployed.on()
          }
        })
        .finally(() => {
          setIsLoading.off()
        })
    } else {
      setIsDeployed.off()
    }
  }
  useBlockNumber({
    enabled: !isDeployed,
    onBlock() {
      refetch()
    },
    watch: true,
  })
  useEffect(() => {
    refetch()
  }, [usedWalletAddress])

  return {
    isDeployed: isDeployed,
    isLoading,
    refetch,
  }
}
