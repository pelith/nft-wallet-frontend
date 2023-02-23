import { FunctionComponent } from 'react'
import { useNetwork } from 'wagmi'

import useNFTWalletIsDeployed from '@/hooks/useNFTWalletIsDeployed'

export default function withNFTWalletDeployed<T extends { walletAddress: `0x${string}` }>(
  Component: FunctionComponent<T>,
) {
  const resultComponent = ({ ...props }: T) => {
    const { chain } = useNetwork()
    const { data: walletIsDeployed = false, isLoading } = useNFTWalletIsDeployed({
      walletAddress: props.walletAddress,
      chainId: chain!.id,
    })

    return walletIsDeployed && !isLoading ? (
      <Component {...props} />
    ) : (
      <>wallet not deployed or empty</>
    )
  }

  return resultComponent
}
