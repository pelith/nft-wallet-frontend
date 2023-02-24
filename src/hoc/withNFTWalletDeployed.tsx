import { FunctionComponent } from 'react'

import useNFTWalletIsDeployed from '@/hooks/useNFTWalletIsDeployed'

export default function withNFTWalletDeployed<
  T extends { NFTWalletAddress: `0x${string}` },
>(Component: FunctionComponent<T>) {
  const resultComponent = ({ ...props }: T) => {
    const { isDeployed: walletIsDeployed = false, isLoading } = useNFTWalletIsDeployed({
      walletAddress: props.NFTWalletAddress,
    })

    return walletIsDeployed && !isLoading ? (
      <Component {...props} />
    ) : (
      <>wallet not deployed or empty</>
    )
  }

  return resultComponent
}
