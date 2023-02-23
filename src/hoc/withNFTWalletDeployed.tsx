import { FunctionComponent } from 'react'
import { useNetwork } from 'wagmi'

import useNFTWalletIsDeployed from '@/hooks/useNFTWalletIsDeployed'

export default function withNFTWalletDeployed<
  T extends { NFTWalletAddress: `0x${string}` },
>(Component: FunctionComponent<T>) {
  const resultComponent = ({ ...props }: T) => {
    const { chain } = useNetwork()
    const { data: walletIsDeployed = false, isLoading } = useNFTWalletIsDeployed({
      walletAddress: props.NFTWalletAddress,
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
